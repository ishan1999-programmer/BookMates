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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred while getting all users.",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
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

const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const updatedUserDetails = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedUserDetails,
      { new: true, runValidators: true }
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

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId).select(
      "-password"
    );
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

module.exports = { getAllUsers, getUser, updateUser, deleteUser, createUser };
