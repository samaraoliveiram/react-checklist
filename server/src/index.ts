require('dotenv').config();
import express = require("express");
import * as mongoose from "mongoose";
import * as BodyParser from "body-parser";
import user from '../routes/user';


const {DB_URL, DB_NAME, DB_USER, DB_PASS} = process.env;

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}?retryWrites=true`
)

const app: express.Application = express();
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

app.use('/api/users', user);

app.listen(8080, function() {
  console.log("App listening on port 8080!");
});
