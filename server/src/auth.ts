require("dotenv").config();
import { Response, Request, NextFunction } from "express";
import jwt, { VerifyCallback } from "jsonwebtoken";

const secret = process.env.SECRET;

if (!secret) {
  throw new Error("Missing secret in .env");
}

const createVerifyCallback = (
  req: Request,
  res: Response,
  next: NextFunction
): VerifyCallback => (err, decoded) => {
  if (err) {
    res.status(401).send("Unauthorized: Invalid token");
  } else {
    //@ts-ignore
    req.email = decoded.email;

    // TODO: verificar se o User existe a partir do email
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
