const mongoose = require("mongoose");

const { Schema } = mongoose;


const postSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    bookTitle: { type: String, required: [true, "Book title is required"] },
    bookAuthor: { type: String, required: [true, "Book author is required"] },
    bookGenres: [
      { type: String, required: [true, "Book genres are required"] },
    ],
    rating: {
      type: Number,
      required: [true, "Book rating is required"],
      min: 0,
      max: 5,
    },
    bookImage: { type: String, default: "" },
    review: {
      type: String,
      required: [true, "Book review is required"],
      minlength: [10, "Review must be atleast 10 characters long"],
    },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
