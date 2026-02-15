const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    text: {
      type: String,
      required: [true, "Text is required"],
      minlength: [1, "Comment must not be empty"],
      maxlength: [200, "Comment must be atmost 500 characters long"],
    },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
