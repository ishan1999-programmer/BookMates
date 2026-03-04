const { getNotifications } = require("../controllers/notification.controller");
const express = require("express");

const notificationRouter = express.Router();

notificationRouter.get("/", getNotifications);

module.exports = notificationRouter;
