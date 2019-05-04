require("dotenv").config();
import { Router, Response, Request } from "express";
import mongoose from "mongoose";
import todo from "../models/Todo";
import withAuth, { ReqWithAuth } from "../auth";
import List from "../models/List";
import Todo from "../models/Todo";

const router = Router();

router.post("/", withAuth, async (req: ReqWithAuth, res) => {
  const list = new List({
    author: req.user,
    title: req.body.title,
    description: req.body.description
  });
  try {
    await list.save();
    res.status(200).json({
      success: "New list has been created",
      list
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.get("/", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const lists = await List.find({ author: req.user }).exec();
    res.send(lists);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const list = await List.find({
      author: req.user,
      _id: req.params.id
    })
      .populate("todos")
      .exec();
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/:id", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const list = await List.findOneAndUpdate(
      { author: req.user, _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const list = await List.deleteOne({
      author: req.user,
      _id: req.params.id
    }).exec();
    const todo = await Todo.deleteMany({
      author: req.user,
      list: req.params.id
    }).exec();
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
