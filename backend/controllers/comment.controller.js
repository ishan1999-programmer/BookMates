const { json } = require("express");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Post = require("../models/post.model");

const createComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const commentDetails = req.body;
    const postId = commentDetails.post;
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    const createdComment = await Comment.create({
      ...commentDetails,
      user: userId,
    });
    res.status(201).json({ success: true, data: createdComment });
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

const updateComment = async (req, res) => {
  try {
    const { id: commentId } = req.params;
    const updatedCommentDetails = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      updatedCommentDetails,
      { new: true, runValidators: true }
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
  updateComment,
  deleteComment,
};
