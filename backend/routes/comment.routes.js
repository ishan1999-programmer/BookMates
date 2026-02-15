const express = require("express");

const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

const commentRouter = express.Router();

commentRouter.get("/:id", getComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

module.exports = commentRouter;
