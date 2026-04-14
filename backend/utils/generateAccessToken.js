const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

module.exports = generateAccessToken;
