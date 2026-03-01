const express = require("express");

const followRequestRouter = express.Router();

const {
  sendFollowRequest,
  cancelFollowRequest,
  handleFollowRequest,
} = require("../controllers/followRequest.controller");

followRequestRouter.post("/", sendFollowRequest);
followRequestRouter.delete("/:followRequestId", cancelFollowRequest);
// followRequestRouter.delete("/:followRequestId", handleFollowRequest);

module.exports = followRequestRouter;
