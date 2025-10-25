const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const loginRouter = require("./routes/login.routes");
const postRouter = require("./routes/post.routes");
const commentRouter = require("./routes/comment.routes");
const authenticator = require("./middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", authenticator, postRouter);
app.use("/api/comments", authenticator, commentRouter);

module.exports = app;
