const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

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

module.exports = loginUser;
