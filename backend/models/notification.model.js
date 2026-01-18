const mongoose = require("mongoose");

const { Schema ,model} = mongoose;

const notificationSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["like", "comment"],
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
