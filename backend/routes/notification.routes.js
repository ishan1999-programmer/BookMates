const {
  getNotifications,
  updateNotification,
} = require("../controllers/notification.controller");
const express = require("express");

const notificationRouter = express.Router();

notificationRouter.get("/", getNotifications);
notificationRouter.put("/:notificationId", updateNotification);

module.exports = notificationRouter;
