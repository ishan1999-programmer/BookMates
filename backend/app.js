const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const loginRouter = require("./routes/login.routes");
const postRouter = require("./routes/post.routes");
const commentRouter = require("./routes/comment.routes");
const followRequestRouter = require("./routes/followRequest.routes");
const notificationRouter = require("./routes/notification.routes");
const bookRouter = require("./routes/book.routes");
const readRouter = require("./routes/read.routes");
const uploadRouter = require("./routes/upload.routes");
const authenticator = require("./middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", authenticator, postRouter);
app.use("/api/comments", authenticator, commentRouter);
app.use("/api/follow-requests", authenticator, followRequestRouter);
app.use("/api/notifications", authenticator, notificationRouter);
app.use("/api/books", authenticator, bookRouter);
app.use("/api/reads", authenticator, readRouter);
app.use("/api/uploads", authenticator, uploadRouter);

module.exports = app;
