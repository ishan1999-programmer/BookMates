const mongoose = require("mongoose");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Like = require("../models/like.model");
const Notification = require("../models/notification.model");

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
    const { userId } = req.user;
    const { postId } = req.params;

    const existingPost = await Post.findById(postId)
      .populate("user", "fullname username avatar")
      .lean();
    if (!existingPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }

    const isLikedByMe = await Like.exists({ user: userId, post: postId });

    existingPost.isLikedByMe = isLikedByMe ? true : false;
    res.status(200).json({ success: true, data: existingPost });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting post.",
    });
  }
};

const getPostsByUsername = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username } = req.params;
    const { createdAt, _id } = req.query;

    const isUserExists = await User.exists({ username });
    if (!isUserExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const userIdOfUser = isUserExists._id;

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

    const userPosts = isCursorValid
      ? await Post.find({
          user: userIdOfUser,
          $or: [
            { createdAt: { $lt: parsedDate } },
            { createdAt: parsedDate, _id: { $lt: parsedId } },
          ],
        })
          .sort({ createdAt: -1, _id: -1 })
          .limit(6)
          .populate("user", "fullname username avatar")
          .lean()
      : await Post.find({ user: userIdOfUser })
          .sort({ createdAt: -1, _id: -1 })
          .limit(6)
          .populate("user", "fullname username avatar")
          .lean();

    let hasMore = false,
      nextCursor = null;
    if (userPosts.length === 6) {
      hasMore = true;
      userPosts.pop();
      nextCursor = {
        createdAt: userPosts[userPosts.length - 1].createdAt,
        _id: userPosts[userPosts.length - 1]._id,
      };
    }

    const postIds = userPosts.map((post) => post._id);
    const likedPosts = await Like.find({
      user: userId,
      post: { $in: postIds },
    });
    const likedPostIds = new Set(
      likedPosts.map((like) => like.post.toString()),
    );

    userPosts.forEach((post) => {
      post.isLikedByMe = likedPostIds.has(post._id.toString());
    });

    return res
      .status(200)
      .json({ success: true, data: { posts: userPosts, hasMore, nextCursor } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting user posts.",
    });
  }
};

const getUserPosts = async (req, res) => {
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

const getUserFeed = async (req, res) => {
  try {
    const { userId } = req.user;
    const { createdAt, _id } = req.query;

    const existingUser = await User.findById(userId).select("followings");
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const feedUserIds = existingUser.followings;
    const newFeedUserIds = [...feedUserIds, userId];

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
          user: { $in: newFeedUserIds },
          $or: [
            { createdAt: { $lt: parsedDate } },
            { createdAt: parsedDate, _id: { $lt: parsedId } },
          ],
        })
          .sort({ createdAt: -1, _id: -1 })
          .limit(21)
          .populate("user", "fullname username avatar")
          .lean()
      : Post.find({ user: { $in: newFeedUserIds } })
          .sort({ createdAt: -1, _id: -1 })
          .limit(21)
          .populate("user", "fullname username avatar")
          .lean();

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

    const postIds = userFeed.map((post) => post._id);
    const likedPosts = await Like.find({
      user: userId,
      post: { $in: postIds },
    });
    const likedPostIds = new Set(
      likedPosts.map((like) => like.post.toString()),
    );

    userFeed.forEach((post) => {
      post.isLikedByMe = likedPostIds.has(post._id.toString());
    });

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

    if (String(existingPost.user) === userId) {
      return res
        .status(400)
        .json({ success: false, message: "You can't like your own post" });
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

    const existingNotification = await Notification.exists({
      sender: userId,
      receiver: existingPost.user,
      post: postId,
      type: "like",
    });

    if (existingNotification) {
      return res
        .status(409)
        .json({ success: false, message: "Notification already exists." });
    }

    await Notification.create({
      sender: userId,
      receiver: existingPost.user,
      post: postId,
      type: "like",
    });

    return res
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

    if (String(existingPost.user) === userId) {
      return res
        .status(400)
        .json({ success: false, message: "You can't unlike your own post" });
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

    const deletedNotification = await Notification.deleteOne({
      sender: userId,
      receiver: existingPost.user,
      post: postId,
      type: "like",
    });

    if (deletedNotification.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found." });
    }

    return res
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
  getPostsByUsername,
  getUserFeed,
  getUserPosts,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
