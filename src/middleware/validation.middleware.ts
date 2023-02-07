import Express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ICreateUser } from "./../entity/users/user.interface";
import IPost from "./../entity/posts/post.interface";
import User from "entity/users/user.entity";

export interface RequestType<T> extends Express.Request {
  user: T;
}

export function validateUserForm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    //console.log("Please enter missing fields");
    res.status(400).json({ message: "Please enter missing fields" });
    return;
  } else if (password != confirmPassword) {
    return res
      .status(400)
      .json({ status: false, message: "Your passwords do not match" });
  }
  next();
}

export function validatePostForm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { content, title }: IPost = req.body;

  try {
    if (!content || !title) {
      return res.json({
        message: "Please, enter all required fields to create your Post.",
      });
    }
    next();
  } catch (error) {
    return res.json({ error });
  }
}

export async function hashPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user: ICreateUser = req.body;

  const hash = await bcrypt.hash(user.password, 8);
  user.password = hash;
  req.body.user = user;
  next();
}

export const verifyToken = async (
  req: RequestType<{}>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("got here");
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log("got here");

      return res
        .status(401)
        .json({ message: "No token, authorization denied." });
    }
    // verify token and extract user
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = Object.values(decoded)[0];

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res.status(500).json({
        message: "Your session has expired. Kindly login again to continue.",
      });
    }
    return res.status(500).json({ message: "Server error", error });
  }
};
