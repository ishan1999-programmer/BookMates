const express = require("express");

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getCommentsOfPost,
  likePost,
  unlikePost
} = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.get("/:id", getPost);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);
postRouter.get("/:id/comments", getCommentsOfPost);
postRouter.post("/:id/like", likePost);
postRouter.delete("/:id/like", unlikePost);


module.exports = postRouter;
