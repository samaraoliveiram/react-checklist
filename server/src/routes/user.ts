require("dotenv").config();
import { Router, Response, Request } from "express";
import mongoose from "mongoose";
import { hash as _hash } from "bcrypt";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import withAuth from "../auth";

const secret = process.env.SECRET;

if (!secret) {
  throw new Error("Missing secret in .env");
}

const router = Router();

router.post("/signup", function(req, res) {
  _hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(function(result) {
          console.log(result);
          res.status(200).json({
            success: "New user has been created"
          });
        })
        .catch(error => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});

router.post("/signin", function(req, res) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(function(user) {
      if (!user) {
        return res.status(401).json({
          failed: "Unauthorized Access"
        });
      }
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) {
          return res.status(401).json({
            failed: "Unauthorized Access"
          });
        }
        if (result) {
          const JWTToken = jwt.sign(
            {
              email: user.email,
              _id: user._id
            },
            secret,
            {
              expiresIn: "2h"
            }
          );
          return res.status(200).json({
            success: "Welcome to the JWT Auth",
            token: JWTToken
          });
        }
        return res.status(401).json({
          failed: "Unauthorized Access"
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

// router.get("/api/secret", withAuth, function(request : Request, response : Response) {
//   response.send("Que caralhos to fazeno");
// });

router.get("/checkToken", withAuth, function(
  request: Request,
  response: Response
) {
  response.status(200).send();
});

router.get("/", async (request, response) => {
  try {
    var result = await User.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  try {
    var user = new User(request.body);
    var result = await user.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/:id", async (request, response) => {
  try {
    var person = await User.findById(request.params.id).exec();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.put("/:id", async (request, response) => {
  try {
    var person = await User.findById(request.params.id).exec();
    if (!person) {
      return false;
    }
    person.set(request.body);
    var result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    var result = await User.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

export default router;
