const express = require("express");
const { addBook, updateBook } = require("../controllers/read.controller");

const readRouter = express.Router();

readRouter.post("/", addBook);
readRouter.put("/:readId", updateBook);

module.exports = readRouter;
