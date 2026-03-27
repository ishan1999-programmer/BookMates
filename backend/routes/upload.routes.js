const express = require("express");
const { generateUploadUrl } = require("../controllers/upload.controller");

const uploadRouter = express.Router();

uploadRouter.post("/generate-upload-url", generateUploadUrl);

module.exports = uploadRouter;
