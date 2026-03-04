const Notification = require("../models/notification.model");
const User = require("../models/user.model");

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.user;
    const existingUser = await User.exists({ _id: userId });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const notifications = await Notification.find({ receiver: userId })
      .populate("sender", "avatar fullname username")
      .populate("post", "bookTitle")
      .lean();

    return res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting notifications.",
    });
  }
};

module.exports = { getNotifications };
