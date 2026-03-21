const express = require("express");

const bookRouter = express.Router();

const authenticator = require("../middlewares/auth.middleware");
const { searchBooks } = require("../controllers/book.controller");

bookRouter.get("/search", authenticator, searchBooks);

module.exports = bookRouter;
