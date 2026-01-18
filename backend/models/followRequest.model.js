const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const followRequestSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true })

const FollowRequest = model("FollowRequest", followRequestSchema);

module.exports = FollowRequest;
