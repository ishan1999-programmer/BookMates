const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    fullname: {
      type: String,
      required: [true, "Fullname is required"],
      minlength: [3, "Fullname must be at least 3 characters long"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 characters long"],
      lowercase: true,
      unique,
    },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followersCount: { type: Number, default: 0 },
    followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followingsCount: { type: Number, default: 0 },
    booksRead: [{ type: Schema.Types.ObjectId, ref: "Read" }],
    booksReadCount: { type: Number, default: 0 },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
