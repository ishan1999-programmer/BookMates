const User = require("../models/user.model");
const FollowRequest = require("../models/followRequest.model");

const sendFollowRequest = async (req, res) => {
  try {
    const { userId: senderId } = req.user;
    const receiverId = req.body.receiverId;
    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send a follow request to yourself.",
      });
    }
    const existingReceiver = await User.findById(receiverId);
    if (!existingReceiver) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver user not found." });
    }
    const existingFollowRequest = await FollowRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (existingFollowRequest) {
      return res.status(409).json({
        success: false,
        message:
          existingFollowRequest.status === "pending"
            ? "You already sent follow request to this user which is still pending."
            : "You already follow this user.",
      });
    }
    const followRequest = await FollowRequest.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    res.status(201).json({ success: true, data: followRequest });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while sending follow request.",
      });
    }
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred while sending follow request.",
    });
  }
};

const acceptOrRejectFollowRequest = async (req, res) => {
  try {
    const { userId: receiverId } = req.user;
    const { id: requestId } = req.params;
    const { status } = req.body;

    const followRequest = await FollowRequest.findOneAndUpdate(
      { _id: requestId, receiver: receiverId, status: "pending" },
      { status },
      { new: true }
    );

    if (!followRequest) {
      return res.status(404).json({
        success: false,
        message: "No pending follow request found for this user.",
      });
    }

    const { sender: senderId } = followRequest;

    if (status === "accepted") {
      await User.findByIdAndUpdate(senderId, {
        $addToSet: { followings: receiverId },
        $inc: { followingsCount: 1 },
      });

      await User.findByIdAndUpdate(receiverId, {
        $addToSet: { followers: senderId },
        $inc: { followersCount: 1 },
      });
    }

    res.status(200).json({
      success: true,
      data: { senderId, receiverId },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "An unexpected error occurred while accepting follow request.",
    });
  }
};

module.exports = { sendFollowRequest, acceptOrRejectFollowRequest };
