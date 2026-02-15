const mongoose = require("mongoose");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Like = require("../models/like.model");

const createPost = async (req, res) => {
  try {
    const { userId } = req.user;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const postDetails = req.body;
    const createdPost = await Post.create({ ...postDetails, user: userId });
    res.status(201).json({ success: true, data: createdPost });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while creating post.",
      });
    }
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating post.",
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting post.",
    });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const userPosts = await Post.find({ user: userId });
    res.status(200).json({ success: true, data: userPosts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting posts of user.",
    });
  }
};

const getCurrentUserPosts = async (req, res) => {
  try {
    const { userId } = req.user;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const userPosts = await Post.find({ user: userId });
    res.status(200).json({ success: true, data: userPosts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting posts of user.",
    });
  }
};

const getCurrentUserFeed = async (req, res) => {
  try {
    const { userId } = req.user;
    const { createdAt, _id } = req.query;

    const existingUser = await User.findById(userId).select("followings");
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const feedAuthorIds = existingUser.followings;
    const newFeedAuthorIds = [...feedAuthorIds, userId];

    let isCursorValid = false;
    let parsedDate = null;
    let parsedId = null;

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

    let userFeed = isCursorValid
      ? Post.find({
          user: { $in: newFeedAuthorIds },
          $or: [
            { createdAt: { $lt: parsedDate } },
            { createdAt: parsedDate, _id: { $lt: parsedId } },
          ],
        })
          .sort({ createdAt: -1, _id: -1 })
          .limit(21)
          .populate("user", "_id fullname username avatar")
      : Post.find({ user: { $in: newFeedAuthorIds } })
          .sort({ createdAt: -1, _id: -1 })
          .limit(21)
          .populate("user", "_id fullname username avatar");

    userFeed = await userFeed;

    let hasMore = false,
      nextCursor = null;
    if (userFeed.length === 21) {
      hasMore = true;
      userFeed.pop();
      nextCursor = {
        createdAt: userFeed[userFeed.length - 1].createdAt,
        _id: userFeed[userFeed.length - 1]._id,
      };
    }

    return res
      .status(200)
      .json({ success: true, data: { posts: userFeed, hasMore, nextCursor } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting feed posts.",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedPostDetails = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      updatedPostDetails,
      { new: true, runValidators: true },
    );
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while updating user.",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "An unexpected error occurred while updating post.",
      });
    }
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: deletedPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while deleting post.",
    });
  }
};

const likePost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { postId } = req.params;
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      return res
        .status(409)
        .json({ success: false, message: "User already liked this post." });
    }
    await Like.create({ user: userId, post: postId });
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { likesCount: 1 },
      },
      { runValidators: true, new: true },
    );

    res
      .status(201)
      .json({ success: true, data: { postId, likesCount: post.likesCount } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while liking post.",
    });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { userId } = req.user;
    const { postId } = req.params;
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    const unlike = await Like.findOneAndDelete({ post: postId, user: userId });
    if (!unlike) {
      return res
        .status(404)
        .json({ success: false, message: "This user/post does not exist." });
    }
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { likesCount: -1 },
      },
      { runValidators: true, new: true },
    );

    res
      .status(200)
      .json({ success: true, data: { postId, likesCount: post.likesCount } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while unliking post.",
    });
  }
};

module.exports = {
  createPost,
  getPost,
  getPostsByUser,
  getCurrentUserFeed,
  getCurrentUserPosts,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
