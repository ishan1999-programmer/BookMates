const User = require("../models/user.model");
const FollowRequest = require("../models/followRequest.model");

const sendFollowRequest = async (req, res) => {
  try {
    const { userId: senderId } = req.user;
    const { receiver: receiverId } = req.body;

    const existingSender = await User.exists({ _id: senderId });
    if (!existingSender) {
      return res
        .status(404)
        .json({ success: false, message: "Sender not found" });
    }

    const existingReceiver = await User.exists({ _id: receiverId });
    if (!existingReceiver) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver not found" });
    }

    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "You cannot send request to yourself",
      });
    }

    const existingFollowRequest = await FollowRequest.exists({
      sender: senderId,
      receiver: receiverId,
    });
    if (existingFollowRequest) {
      return res.status(409).json({
        success: false,
        message: "You already sent a follow request to this user",
      });
    }

    const createdFollowRequest = await FollowRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    return res.status(201).json({ success: true, data: createdFollowRequest });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while sending follow request.",
      });
    }
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while sending follow request.",
    });
  }
};

const cancelFollowRequest = async (req, res) => {
  try {
    const { followRequestId } = req.params;

    const deletedFollowRequest =
      await FollowRequest.findByIdAndDelete(followRequestId);

    if (!deletedFollowRequest) {
      return res.status(409).json({
        success: false,
        message: "You have not sent a follow request to this user",
      });
    }

    return res.status(201).json({ success: true, data: deletedFollowRequest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while canceling follow request.",
    });
  }
};

const handleFollowRequest = async (req, res) => {
  try {
    const { followRequestId } = req.params;
    const { action } = req.body;

    const existingFollowRequest = await FollowRequest.findById(followRequestId);
    if (!existingFollowRequest) {
      res
        .status(404)
        .json({ success: false, message: "Follow request not found." });
    }

    const senderId = existingFollowRequest.sender;
    const existingSender = await User.findById(senderId);
    if (!existingSender) {
      return res
        .status(404)
        .json({ success: false, message: "Sender not found" });
    }

    const { userId: receiverId } = req.user;
    const existingReceiver = await User.findById(receiverId);
    if (!existingReceiver) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver not found" });
    }

    let updatedSender, updatedReceiver;
    if (action === "accepted") {
      updatedSender = await User.findByIdAndUpdate(
        senderId,
        {
          $inc: { followingsCount: 1 },
          $addToSet: { followings: receiverId },
        },
        { runValidators: true, new: true },
      );
      updatedReceiver = await User.findByIdAndUpdate(
        receiverId,
        {
          $inc: { followersCount: 1 },
          $addToSet: { followers: senderId },
        },
        { runValidators: true, new: true },
      );
    }

    const deletedFollowRequest =
      await FollowRequest.findByIdAndDelete(followRequestId);

    return res.status(200).json({
      success: true,
      data: {
        sender: deletedFollowRequest.sender,
        receiver: deletedFollowRequest.receiver,
        followersCount: updatedReceiver.followersCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while accepting/rejecting follow request.",
    });
  }
};

module.exports = {
  sendFollowRequest,
  cancelFollowRequest,
  handleFollowRequest,
};
