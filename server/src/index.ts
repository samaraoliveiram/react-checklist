require("dotenv").config();
import express = require("express");
import mongoose from "mongoose";
import BodyParser from "body-parser";
import user from "./routes/user";
// import todoList from "./routes/todoList";
import cookieParser from "cookie-parser";

const { DB_URL, DB_NAME, DB_USER, DB_PASS } = process.env;
//`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}?retryWrites=true`

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}?retryWrites=true`
);

const app: express.Application = express();
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(cookieParser());

app.use("/api/users", user);
// app.use("/api/todolists", todoList);

app.listen(8080, function() {
  console.log("App listening on port 8080!");
});
