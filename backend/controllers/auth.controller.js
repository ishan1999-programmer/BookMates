const bcrypt = require("bcryptjs");
const generateAccessToken = require("../utils/generateAccessToken");

const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "Please login using Google",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }
    const token = generateAccessToken(user._id);

    const { password: _, ...userDetails } = user.toObject();

    res.status(200).json({
      success: true,
      data: { userDetails, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred during user login",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { login, googleLogin };
