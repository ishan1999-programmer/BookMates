const express = require("express");
const { addBook,removeBook, updateBook } = require("../controllers/read.controller");

const readRouter = express.Router();

readRouter.post("/", addBook);
readRouter.delete("/:bookId",removeBook);
readRouter.put("/:readId", updateBook);

module.exports = readRouter;
