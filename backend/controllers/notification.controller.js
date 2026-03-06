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
      .sort({ createdAt: -1 })
      .populate("sender", "avatar fullname username")
      .populate("post", "bookTitle")
      .lean();

    const notReadCount = notifications.reduce(
      (acc, curr) => (curr.isRead ? acc : acc + 1),
      0,
    );

    return res
      .status(200)
      .json({ success: true, data: { notifications, notReadCount } });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting notifications.",
    });
  }
};

const updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { runValidators: true, new: true },
    );

    if (!updatedNotification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found." });
    }

    return res.status(200).json({ success: true, data: updatedNotification });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while updating notification.",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred while updating notification.",
      });
    }
  }
};

module.exports = { getNotifications, updateNotification };
