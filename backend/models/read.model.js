const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const readSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: String, required: [true, "BookId is required"] },
    bookTitle: {
      type: String,
      required: [true, "Book title is required"],
    },
    bookAuthor: {
      type: String,
      required: [true, "Book author is required"],
    },
    bookPages: {
      type: Number,
      required: [true, "Book pages is required"],
    },
    bookRating: {
      type: Number,
      required: [true, "Book rating is required"],
      min: 0,
      max: 5,
    },
    bookGenres: [
      { type: String, required: [true, "Book genres are required"] },
    ],
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["want to read", "reading", "read"],
      default: "want to read",
    },
    addedAt: Date,
    startedAt: Date,
    completedAt: Date,
    currentPage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Read = model("Read", readSchema);

module.exports = Read;
