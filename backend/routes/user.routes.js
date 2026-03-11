const express = require("express");

const {
  createUser,
  getUserByUsername,
  getCurrentUser,
  updateUserInfo,
  updateUserPassword,
  deleteUser,
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
userRouter.put("/me", authenticator, updateUserInfo);
userRouter.put("/me/password", authenticator, updateUserPassword);
userRouter.delete("/me", authenticator, deleteUser);
userRouter.get("/me/posts", authenticator, getCurrentUserPosts);
userRouter.get("/me/feed", authenticator, getCurrentUserFeed);
userRouter.delete("/:userId/follow", authenticator, unfollowUser);
userRouter.post("/:userId/follow", authenticator, followUser);
userRouter.get("/:userId/posts", authenticator, getPostsByUser);
userRouter.get("/:username", authenticator, getUserByUsername);


module.exports = userRouter;
