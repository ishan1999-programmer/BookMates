const express = require("express");

const {
  createUser,
  getUserByUsername,
  getUser,
  updateUserInfo,
  updateUserPassword,
  deleteUser,
  unfollowUser,
  followUser,
  searchUsers
} = require("../controllers/user.controller");

const {
  getPostsByUsername,
  getUserFeed,
  getUserPosts,
} = require("../controllers/post.controller");

const authenticator = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.get("/search", authenticator, searchUsers);
userRouter.post("/", createUser);
userRouter.get("/me", authenticator, getUser);
userRouter.put("/me", authenticator, updateUserInfo);
userRouter.put("/me/password", authenticator, updateUserPassword);
userRouter.delete("/me", authenticator, deleteUser);
userRouter.get("/me/posts", authenticator, getUserPosts);
userRouter.get("/me/feed", authenticator, getUserFeed);
userRouter.delete("/:userId/follow", authenticator, unfollowUser);
userRouter.post("/:userId/follow", authenticator, followUser);
userRouter.get("/:username/posts", authenticator, getPostsByUsername);
userRouter.get("/:username", authenticator, getUserByUsername);


module.exports = userRouter;
