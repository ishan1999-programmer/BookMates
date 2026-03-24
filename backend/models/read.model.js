const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const readSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookId: { type: String, required: [true, "BookId is required"] },
    bookTitle: {
      type: String,
    },
    bookAuthors: [
      {
        type: String,
      },
    ],
    bookCover: { type: String, default: "" },
    bookPages: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["want to read", "reading", "read"],
      default: "want to read",
    },
    currentPage: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Read = model("Read", readSchema);

module.exports = Read;
