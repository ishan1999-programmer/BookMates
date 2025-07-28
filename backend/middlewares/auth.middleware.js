const jwt = require("jsonwebtoken");

const authenticator = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Session expired. Please login again."
          : error.message || "Authentication failed.",
    });
  }
};

module.exports = authenticator;
