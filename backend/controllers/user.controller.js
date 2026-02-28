const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      ...userDetails,
      password: hashedPassword,
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log(error);
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

const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username }).select("-password");
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

const getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
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
      res
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

const updateCurrentUser = async (req, res) => {
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
    res.status(200).json({ success: true, data: updatedUser });
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

const deleteCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const deletedUser =
      await User.findByIdAndDelete(userId).select("-password");
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, data: deletedUser });
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
  getUser,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  createUser,
  unfollowUser,
  searchUsers,
};
