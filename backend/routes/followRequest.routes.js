const express = require("express");
const {
  sendFollowRequest,
  acceptOrRejectFollowRequest,
} = require("../controllers/followRequest.controller");

const followRequestRouter = express.Router();

followRequestRouter.post("/send", sendFollowRequest);
followRequestRouter.put("/:id", acceptOrRejectFollowRequest);

module.exports = followRequestRouter;
