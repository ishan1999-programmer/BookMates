const bcrypt = require("bcryptjs");
const generateAccessToken = require("../utils/generateAccessToken");
const verifyGoogleToken = require("../services/verifyGoogleToken.service");

const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(
      "email username password",
    );
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

    return res.status(200).json({
      success: true,
      data: {
        userDetails: { email: user.email, username: user.username },
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during user login",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { googleToken } = req.body;

    const payload = await verifyGoogleToken(googleToken);

    const { email, name, picture, sub } = payload;

    const existingUser = await User.findOne({ email }).select(
      "email username googleId",
    );

    if (!existingUser) {
      const defaultUsername = `${email.split("@")[0]}@BookMates`;
      const createdUser = await User.create({
        email,
        fullname: name,
        username: defaultUsername,
        googleId: sub,
        authProvider: "google",
        avatar: picture || "",
        isVerified: true,
      });
      const token = generateAccessToken(createdUser._id);
      return res.status(200).json({
        success: true,
        data: {
          userDetails: {
            email: createdUser.email,
            username: createdUser.username,
          },
          token,
        },
      });
    } else if (!existingUser.googleId) {
      existingUser.googleId = sub;
      existingUser.isVerified = true;
      await existingUser.save();
    }

    const token = generateAccessToken(existingUser._id);

    return res.status(200).json({
      success: true,
      data: {
        userDetails: {
          email: existingUser.email,
          username: existingUser.username,
        },
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during google login",
    });
  }
};

module.exports = { login, googleLogin };
