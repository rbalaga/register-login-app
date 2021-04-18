const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const registerRouter = require("./auth/register");
const loginRouter = require("./auth/login");
const postsRouter = require("./posts/posts");
const sessionsRouter = require("./posts/sessions");

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);
app.use("/sessions", sessionsRouter);

app.get("/", (req, res) => {
  res.write('<head><meta http-equiv="refresh" content="30"></head>');
  res.end("Server listening at 3000");
});

const errHandler = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send({ status: err.message });
};

app.use(errHandler);

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
