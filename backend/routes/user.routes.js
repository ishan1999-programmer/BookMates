const express = require("express");

const {
  createUser,
  getUser,
  getCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  unfollowUser,
  followUser,
  searchUsers
} = require("../controllers/user.controller");

const {
  getPostsByUser,
  getCurrentUserFeed,
  getCurrentUserPosts,
} = require("../controllers/post.controller");

const authenticator = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.get("/search", authenticator, searchUsers);
userRouter.post("/", createUser);
userRouter.get("/me", authenticator, getCurrentUser);
userRouter.put("/me", authenticator, updateCurrentUser);
userRouter.delete("/me", authenticator, deleteCurrentUser);
userRouter.get("/me/posts", authenticator, getCurrentUserPosts);
userRouter.get("/me/feed", authenticator, getCurrentUserFeed);
userRouter.delete("/:userId/follow", authenticator, unfollowUser);
userRouter.post("/:userId/follow", authenticator, followUser);
userRouter.get("/:userId/posts", authenticator, getPostsByUser);
userRouter.get("/:username", authenticator, getUser);


module.exports = userRouter;
