const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookTitle: { type: String, required: [true, "Book title is required"] },
    bookAuthor: { type: String, required: [true, "Book author is required"] },
    bookGenres: [
      { type: String, required: [true, "Book genres are required"] },
    ],
    bookRating: {
      type: Number,
      required: [true, "Book rating is required"],
      min: 0,
      max: 5,
    },
    bookImage: { type: String, default: "" },
    bookReview: {
      type: String,
      required: [true, "Book review is required"],
      minlength: [10, "Review must be atleast 10 characters long"],
      maxlength: [500, "Review must be atmost 500 characters long"],
    },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Post = model("Post", postSchema);

module.exports = Post;
