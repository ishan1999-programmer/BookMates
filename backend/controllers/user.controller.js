const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const followRequest = require("../models/followRequest.model");
const Post = require("../models/post.model");
const FollowRequest = require("../models/followRequest.model");
const Notification = require("../models/notification.model");
const Read = require("../models/read.model");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");

const createUser = async (req, res) => {
  try {
    const userDetails = req.body;
    const { email, password } = userDetails;
    const existingUser = await User.findOne({ email }).select("email");
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email.",
      });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, including one letter and one number.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      ...userDetails,
      password: hashedPassword,
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while creating user.",
      });
    }
    res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while creating user.",
    });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username } = req.params;
    const user = await User.findOne({ username: username })
      .select("-password -followers -followings -booksRead")
      .lean();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isFollowedByMe = await User.exists({
      _id: userId,
      followings: user._id,
    });

    const isRequestSent = await followRequest.exists({
      sender: userId,
      receiver: user._id,
    });

    user.isFollowedByMe = isFollowedByMe ? true : false;

    user.isFollowRequestSent = isRequestSent ? true : false;

    user.followRequestId = isRequestSent ? isRequestSent._id : null;

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while getting user.",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId)
      .select("-password -followers -followings -booksRead")
      .lean();
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while getting user.",
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { userId: followerUserId } = req.user;
    const { userId: followeeUserId } = req.params;

    if (followerUserId === followeeUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot unfollow yourself.",
      });
    }

    const isFollowing = await User.exists({
      _id: followerUserId,
      followings: followeeUserId,
    });

    if (!isFollowing) {
      return res
        .status(400)
        .json({ success: false, message: "You are not following this user." });
    }

    const updatedFollower = await User.findByIdAndUpdate(
      followerUserId,
      {
        $inc: { followingsCount: -1 },
        $pull: { followings: followeeUserId },
      },
      { new: true, runValidators: true },
    );

    const updatedFollowee = await User.findByIdAndUpdate(
      followeeUserId,
      {
        $inc: { followersCount: -1 },
        $pull: { followers: followerUserId },
      },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      data: {
        unfollowedUser: followeeUserId,
        followingsCount: updatedFollower.followingsCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while deleting user.",
    });
  }
};

const followUser = async (req, res) => {
  try {
    const { userId: followerUserId } = req.user;
    const { userId: followeeUserId } = req.params;

    if (followerUserId === followeeUserId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself.",
      });
    }

    const isFollowing = await User.exists({
      _id: followerUserId,
      followings: followeeUserId,
    });

    if (isFollowing) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user.",
      });
    }

    const updatedFollower = await User.findByIdAndUpdate(
      followerUserId,
      {
        $inc: { followingsCount: +1 },
        $push: { followings: followeeUserId },
      },
      { new: true, runValidators: true },
    );

    const updatedFollowee = await User.findByIdAndUpdate(
      followeeUserId,
      {
        $inc: { followersCount: +1 },
        $push: { followers: followerUserId },
      },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      data: {
        followedUser: followeeUserId,
        followingsCount: updatedFollower.followingsCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while following user.",
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { userId } = req.user;
    const updatedUserDetails = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedUserDetails,
      { new: true, runValidators: true },
    ).select("-password");
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while updating user.",
      });
    }
    res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while updating user.",
    });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body;
    const existingUser = await User.findById(userId).select("password");

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(
      currentPassword,
      existingUser.password,
    );

    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect current password" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters, including one letter and one number.",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedNewPassword,
      },
      { runValidators: true, new: true },
    ).select("-password");

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while updating user password.",
      });
    }
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred while updating user password.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const existingUser = await User.findById(userId).select(
      "password followers followings",
    );

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const posts = await Post.find({ user: userId }).select("_id").lean();
    const postsIds = posts.map((p) => p._id);
    await Comment.deleteMany({ post: { $in: postsIds } });
    await Like.deleteMany({ post: { $in: postsIds } });
    await Notification.deleteMany({ post: { $in: postsIds } });
    await Post.deleteMany({ user: userId });

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const commentedPostsWithCount = await Comment.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: "$post", count: { $sum: 1 } } },
    ]);
    for (const post of commentedPostsWithCount) {
      const { _id: postId, count } = post;
      await Post.updateOne(
        { _id: postId },
        {
          $inc: { commentsCount: -count },
        },
      );
    }
    await Comment.deleteMany({ user: userId });

    const likedPosts = await Like.find({ user: userId }).lean();
    const likedPostsIds = likedPosts.map((c) => c.post);
    await Post.updateMany(
      { _id: { $in: likedPostsIds } },
      { $inc: { likesCount: -1 } },
    );
    await Like.deleteMany({ user: userId });

    await FollowRequest.deleteMany({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    await Notification.deleteMany({
      $or: [{ sender: userId }, { receiver: userId }],
    });

    await Read.deleteMany({ user: userId });

    const followersIds = existingUser.followers;
    const followingsIds = existingUser.followings;
    await User.updateMany(
      { _id: { $in: followersIds } },
      { $pull: { followings: userId }, $inc: { followingsCount: -1 } },
    );
    await User.updateMany(
      { _id: { $in: followingsIds } },
      { $pull: { followers: userId }, $inc: { followersCount: -1 } },
    );
    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while deleting user.",
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(200).json({ success: true, data: [] });
    }
    const trimmed = q.trim();
    const users = await User.find({
      $or: [
        {
          fullname: { $regex: `^${trimmed}`, $options: "i" },
        },
        {
          username: { $regex: `^${trimmed}`, $options: "i" },
        },
      ],
    })
      .limit(5)
      .select("_id fullname username avatar")
      .lean();

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while fetching users.",
    });
  }
};

module.exports = {
  getUserByUsername,
  getUser,
  updateUserInfo,
  updateUserPassword,
  deleteUser,
  createUser,
  unfollowUser,
  followUser,
  searchUsers,
};
