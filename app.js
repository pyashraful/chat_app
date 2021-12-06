// external import
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

// internal import

const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(err);
  });

// request parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routing setup

app.use("/", loginRouter);
app.use("/users", usersRouter);
// app.use("/inbox", inboxRouter);

// 404 handlers
app.use(notFoundHandler);

// error handlers
app.use(errorHandler);

// listen
app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}`)
);
