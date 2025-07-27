const express = require("express");

const loginUser = require("../controllers/login.controller");

const loginRouter = express.Router();

loginRouter.post("/", loginUser);

module.exports = loginRouter;
