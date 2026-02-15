const { json } = require("express");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const { default: mongoose } = require("mongoose");

const createComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { postId } = req.params;
    const comment = req.body;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }

    const createdComment = await Comment.create({
      ...comment,
      user: userId,
      post: postId,
    });

    const populatedComment = await createdComment.populate(
      "user",
      "_id fullname avatar",
    );

    await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { commentsCount: 1 },
      },
      { runValidators: true, new: true },
    );

    res.status(201).json({ success: true, data: populatedComment });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while creating comment.",
      });
    }
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating comment.",
    });
  }
};

const getComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });
    }
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting comment.",
    });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { createdAt, _id } = req.query;


    const isExistingPost = await Post.exists({ _id: postId });
    if (!isExistingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    let isCursorValid = false;
    let parsedDate = null,
      parsedId = null;
    if (createdAt && _id) {
      const tempDate = new Date(createdAt);
      const isDateValid = !isNaN(tempDate.getTime());
      const isIdValid = mongoose.Types.ObjectId.isValid(_id);
      if (isDateValid && isIdValid) {
        parsedDate = tempDate;
        parsedId = new mongoose.Types.ObjectId(_id);
        isCursorValid = true;
      }
    }

    let comments = isCursorValid
      ? Comment.find({
          post: postId,
          $or: [
            { createdAt: { $lt: parsedDate } },
            { createdAt: parsedDate, _id: { $lt: parsedId } },
          ],
        })
          .sort({ createdAt: -1, _id: -1 })
          .limit(6)
          .populate("user", "_id fullname avatar")
      : Comment.find({
          post: postId,
        })
          .sort({ createdAt: -1, _id: -1 })
          .limit(6)
          .populate("user", "_id fullname avatar");

    comments = await comments;

    let nextCursor = null,
      hasMore = false;

    if (comments.length === 6) {
      hasMore = true;
      comments.pop();
      nextCursor = {
        createdAt: comments[comments.length - 1].createdAt,
        _id: comments[comments.length - 1]._id,
      };
    }

    return res
      .status(200)
      .json({ success: true, data: { comments, nextCursor, hasMore } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting comments of post.",
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const updatedCommentDetails = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      updatedCommentDetails,
      { new: true, runValidators: true },
    );
    if (!updatedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });
    }
    res.status(200).json({ success: true, data: updatedComment });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while updating comment.",
      });
    }
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating comment.",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found." });
    }
    res.status(200).json({ success: true, data: deletedComment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while deleting comment.",
    });
  }
};

module.exports = {
  createComment,
  getComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
