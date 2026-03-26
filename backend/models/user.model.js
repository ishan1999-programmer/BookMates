const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "User already exists with this email."],
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      match: [
        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
        "Password must contain at least 8 characters, including one letter and one number",
      ],
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
      unique: [true, "Username already exists"],
    },
    bio: {
      type: String,
      default: "",
      maxlength: [250, "Bio must be at most 250 characters long"],
    },
    avatar: { type: String, default: "" },
    favGenres: [{ type: String }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followersCount: { type: Number, default: 0 },
    followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
    followingsCount: { type: Number, default: 0 },
    booksReadCount: { type: Number, default: 0 },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);

module.exports = User;
