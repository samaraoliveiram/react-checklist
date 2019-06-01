require("dotenv").config();
import { Router, Response, Request } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import bcrypt, { hash as _hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import withAuth, { ReqWithAuth } from "../auth";

const secret = process.env.SECRET;

if (!secret) {
  throw new Error("Missing secret in .env");
}

const router = Router();
router.get("/me", withAuth, async (req: ReqWithAuth, res) => {
  try {
    var me = await User.findOne({ _id: req.user });
    res.send(me);
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const hash = await _hash(req.body.password, 10);
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash
    });
    await user.save();
    const JWTToken = jwt.sign(
      {
        email: user.email,
        _id: user._id
      },
      secret,
      { expiresIn: "2h" }
    );
    const { email, id } = user;
    console.log("Token de: ", { email, id });
    res.cookie("token", JWTToken, { httpOnly: true }).sendStatus(200);
  } catch (error) {
    return res.status(500).json({
      error: error
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        failed: "Unauthorized Access"
      });
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const JWTToken = jwt.sign({ email: user.email, _id: user._id }, secret, {
        expiresIn: "2h"
      });
      const { email, id } = user;
      console.log("Token de: ", { email, id });
      res
        .cookie("username", user.firstname)
        .cookie("token", JWTToken, { httpOnly: true })
        .sendStatus(200);
    } else {
      res.status(401).json({
        failed: "Unauthorized Access"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.get("/signout", async (req, res) => {
  res.clearCookie("token", { httpOnly: true }).sendStatus(200);
});

router.patch("/profile/:id", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.user, req.body, {
      new: true
    }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/checkToken", withAuth, function(req, res) {
  res.status(200).send();
});

router.get("/", async (req, res) => {
  try {
    var result = await User.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    var user = new User(req.body);
    var result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    var person = await User.findById(req.params.id).exec();
    res.send(person);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    var person = await User.findById(req.params.id).exec();
    if (!person) {
      return false;
    }
    person.set(req.body);
    var result = await person.save();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var result = await User.deleteOne({ _id: req.params.id }).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
