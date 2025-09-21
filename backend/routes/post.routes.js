const express = require("express");

import {
  createPost,
  getAllPosts,
  getPost,
  getAllPostsOfUser,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.post("/", createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);
postRouter.get("/:userId", getAllPostsOfUser);
postRouter.put("/:id", updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
