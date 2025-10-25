const express = require("express");

const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getPostsOfUser
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id/posts",getPostsOfUser);

module.exports = userRouter;
