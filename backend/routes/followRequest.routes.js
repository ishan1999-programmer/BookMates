const express = require("express");

const followRequestRouter = express.Router();

const {
  sendFollowRequest,
  handleFollowRequest,
} = require("../controllers/followRequest.controller");

followRequestRouter.post("/", sendFollowRequest);
followRequestRouter.delete("/:followRequestId", handleFollowRequest);

module.exports = followRequestRouter;
