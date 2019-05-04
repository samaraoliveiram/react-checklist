require("dotenv").config();
import { Router, Response, Request } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import withAuth, { ReqWithAuth } from "../auth";
import Todo from "../models/Todo";
import List from "../models/List";
import console = require("console");

const router = Router();

router.post("/", withAuth, async (req: ReqWithAuth, res) => {
  const todo = new Todo({
    author: req.user,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    done: req.body.done,
    list: req.body.list
  });
  try {
    await todo.save();
    const list = await List.findOne({
      author: req.user,
      _id: req.body.list
    });
    if (list) {
      list.todos.push(todo._id);
      await list.save();
    }
    res.status(200).json({
      success: "New todo has been created",
      todo
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.get("/", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const todo = await Todo.find({
      author: req.user
    }).exec();
    res.send(todo);
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.get("/:id", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const todo = await Todo.find({
      author: req.user,
      _id: req.params.id
    }).exec();
    res.send(todo);
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.patch("/:id", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { author: req.user, _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(todo);
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

router.delete("/:id", withAuth, async (req: ReqWithAuth, res) => {
  try {
    const todo = await Todo.findOne({
      author: req.user,
      _id: req.params.id
    });
    if (todo) {
      const list = await List.findOne({
        author: req.user,
        _id: todo.list
      });
      if (list) {
        list.todos.splice(list.todos.indexOf(req.params.id), 1);
        await list.save();
        await todo.remove();
        res.send(todo);
      }
    }
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

export default router;
