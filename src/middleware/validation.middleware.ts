import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { ICreateUser } from "./../entity/users/user.interface";

export function validateUserForm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    console.log("Please enter missing fields");
    res.status(404).json({ message: "Please enter missing fields" });
    return;
  } else if (password != confirmPassword) {
    return res
      .status(404)
      .json({ status: false, message: "Your passwords do not match" });
  }
  next();
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
