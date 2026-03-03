const express = require("express");

const followRequestRouter = express.Router();

const {
  sendFollowRequest,
  cancelFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  getFollowRequests,
} = require("../controllers/followRequest.controller");

followRequestRouter.get("/", getFollowRequests);
followRequestRouter.post("/", sendFollowRequest);
followRequestRouter.delete("/:followRequestId", cancelFollowRequest);
followRequestRouter.put("/:followRequestId/accept", acceptFollowRequest);
followRequestRouter.put("/:followRequestId/reject", rejectFollowRequest);

module.exports = followRequestRouter;
