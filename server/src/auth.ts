require("dotenv").config();
import { Response, Request, NextFunction } from "express";
import jwt, { VerifyCallback } from "jsonwebtoken";
import User from "./models/User";

const secret = process.env.SECRET;

if (!secret) {
  throw new Error("Missing secret in .env");
}

export type ReqWithAuth = Request & { user?: string; username?: string };
const createVerifyCallback = (
  req: ReqWithAuth,
  res: Response,
  next: NextFunction
): VerifyCallback => async (err, decoded: any) => {
  if (err) {
    res.status(401).send("Unauthorized: Invalid token");
  } else {
    req.user = decoded._id;
    try {
      var person = await User.findById(req.user).exec();
    } catch (error) {
      res.status(500).send(error);
    }
    next();
  }
};

const withAuth = function(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token; //req.headers["x-usertoken"] as string;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, secret, createVerifyCallback(req, res, next));
  }
};

export default withAuth;
