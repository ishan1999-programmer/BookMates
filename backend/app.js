const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user.routes");
const loginRouter = require("./routes/login.routes");
const postRouter = require("./routes/post.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

module.exports = app;
