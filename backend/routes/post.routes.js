const express = require("express");

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/post.controller");

const { getCommentsByPost } = require("../controllers/comment.controller");

const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.get("/:postId", getPost);
postRouter.put("/:postId", updatePost);
postRouter.delete("/:postId", deletePost);
postRouter.get("/:postId/comments", getCommentsByPost);
postRouter.post("/:postId/like", likePost);
postRouter.delete("/:postId/like", unlikePost);

module.exports = postRouter;
