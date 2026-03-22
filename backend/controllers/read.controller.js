const Read = require("../models/read.model");
const User = require("../models/user.model");

const getReadsByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const existingUser = await User.exists({ username: username });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const reads = await Read.find({ user: existingUser._id }).lean();

    const wantToRead = reads.filter((book) => book.status === "want to read");
    const reading = reads.filter((book) => book.status === "reading");
    const read = reads.filter((book) => book.status === "read");

    return res
      .status(200)
      .json({ success: true, data: { wantToRead, reading, read } });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while getting user reads.",
    });
  }
};

const addBook = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      id: bookId,
      title: bookTitle,
      author: bookAuthor,
      pages: bookPages,
    } = req.body;

    const existingUser = await User.exists({ _id: userId });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingBook = await Read.exists({ user: userId, bookId: bookId });
    if (existingBook) {
      return res.status(409).json({
        success: false,
        message: "This book has already been added by this user",
      });
    }

    const addedBook = await Read.create({
      user: userId,
      bookId,
      bookTitle,
      bookAuthor,
      bookPages,
    });

    return res.status(201).json({ success: true, data: addedBook });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while adding book.",
      });
    }
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while adding book.",
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { userId } = req.user;
    const { readId } = req.params;
    const { status, pages: bookPages, currentPage } = req.body;

    const existingUser = await User.exists({ _id: userId });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updatedBook = await Read.findByIdAndUpdate(
      readId,
      { status, bookPages, currentPage },
      { runValidators: true, new: true },
    );
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    console.log(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed while updating book status",
      });
    }
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating book status",
    });
  }
};

module.exports = { getReadsByUsername, addBook, updateBook };
