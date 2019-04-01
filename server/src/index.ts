require('dotenv').config();
import express = require("express");
const mongoose = require("mongoose");
const BodyParser = require("body-parser");

const {DB_URL, DB_NAME, DB_USER, DB_PASS} = process.env

mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/${DB_NAME}?retryWrites=true`
);


const UserModel = mongoose.model("user", {
  firstname: { type: String, required: true },
  lastname: String
});

const app: express.Application = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Vai lá no mongo
// cata os cara
// responde o client com os cara

app.get("/api/users", async (request, response) => {
  try {
    var result = await UserModel.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/api/users", async (request, response) => {
  try {
    var user = new UserModel(request.body);
    var result = await user.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/api/users/:id", async (request, response) => {
  try {
    var person = await UserModel.findById(request.params.id).exec();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/api/users/:id", async (request, response) => {
  try {
    var person = await UserModel.findById(request.params.id).exec();
    person.set(request.body);
    var result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/api/users/:id", async (request, response) => {
  try {
    var result = await UserModel.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
