const express = require("express");

const {
  createUser,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  unfollowUser,
} = require("../controllers/user.controller");

const {
  getPostsByUser,
  getCurrentUserFeed,
  getCurrentUserPosts,
} = require("../controllers/post.controller");

const authenticator = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/me", authenticator, getCurrentUser);
userRouter.put("/me", authenticator, updateCurrentUser);
userRouter.delete("/me", authenticator, deleteCurrentUser);
userRouter.get("/me/posts", authenticator, getCurrentUserPosts);
userRouter.get("/me/feed", authenticator, getCurrentUserFeed);
userRouter.delete("/:userId/follow", authenticator, unfollowUser);
userRouter.get("/:userId/posts", authenticator, getPostsByUser);
userRouter.get("/:userId", authenticator, getUserById);

module.exports = userRouter;
