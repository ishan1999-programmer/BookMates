const Post = require("../models/post.model");

const createPost = async (req, res) => {
  try {
    const postDetails = res.body;
    const createdPost = await User.create(postDetails);
    res.status(201).json({ success: true, data: createdPost });
  } catch (error) {
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

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).json({ success: true, data: allPosts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred while getting all posts.",
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
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

const getAllPostsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ user: userId });
    res.status(200).json({ success: true, data: userPosts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting posts of user.",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const updatedPostDetails = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      updatedPostDetails,
      { new: true, runValidators: true }
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
    const { id: postId } = req.params;
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

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  getAllPostsOfUser,
  updatePost,
  deletePost,
};
