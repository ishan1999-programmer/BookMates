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
      return res.status(404).json({
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

const acceptFollowRequest = async (req, res) => {
  try {
    const { followRequestId } = req.params;

    const existingFollowRequest = await FollowRequest.findById(followRequestId);
    if (!existingFollowRequest) {
      return res.status(404).json({
        success: false,
        message: "The follow request doesn't exist.",
      });
    }

    const { sender: senderId, receiver: receiverId } = existingFollowRequest;

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
        message: "You cannot accept your own request.",
      });
    }

    const updatedSender = await User.findByIdAndUpdate(
      senderId,
      {
        $addToSet: { followings: receiverId },
        $inc: { followingsCount: 1 },
      },
      { runValidators: true, new: true },
    );
    const updatedReceiver = await User.findByIdAndUpdate(
      receiverId,
      {
        $addToSet: { followers: senderId },
        $inc: { followersCount: 1 },
      },
      { runValidators: true, new: true },
    );

    const { _id, followersCount } = updatedReceiver;

    await FollowRequest.findByIdAndDelete(followRequestId);

    return res
      .status(200)
      .json({ success: true, data: { _id, followersCount } });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "An unexpected error occurred while accepting follow request.",
    });
  }
};

const rejectFollowRequest = async (req, res) => {
  try {
    const { followRequestId } = req.params;

    const existingFollowRequest = await FollowRequest.findById(followRequestId);
    if (!existingFollowRequest) {
      return res.status(404).json({
        success: false,
        message: "The follow request doesn't exist.",
      });
    }

    const { sender: senderId, receiver: receiverId } = existingFollowRequest;

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
        message: "You cannot reject your own request.",
      });
    }

    const { _id, followersCount } = existingReceiver;

    await FollowRequest.findByIdAndDelete(followRequestId);

    return res
      .status(200)
      .json({ success: true, data: { _id, followersCount } });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "An unexpected error occurred while rejecting follow request.",
    });
  }
};

const getFollowRequests = async (req, res) => {
  try {
    const { userId } = req.user;

    const existingUser = await User.exists({ _id: userId });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const followRequests = await FollowRequest.find({
      receiver: userId,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "fullname username avatar");

    return res.status(200).json({ success: true, data: followRequests });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "An unexpected error occurred while fetching follow requests.",
    });
  }
};

module.exports = {
  sendFollowRequest,
  cancelFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  getFollowRequests,
};
