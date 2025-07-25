const mongoose = require("mongoose");

const followRequestSchema = new mongoose.Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FollowRequest = mongoose.model("FollowRequest", followRequestSchema);

module.exports = FollowRequest;
