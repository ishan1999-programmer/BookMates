const express = require("express");
const { login, googleLogin } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/google", googleLogin);

module.exports = authRouter;
