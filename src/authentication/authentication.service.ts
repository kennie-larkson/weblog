//import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppDataSource from "./../data-source";
import User from "./../entity/users/user.entity";

export default class AuthenticationService {
  public async register(userData, req, res, next) {
    if (
      await AppDataSource.manager
        .getRepository(User)
        .findOneBy({ email: userData.email })
    ) {
      throw new Error(
        "Sorry there is a user with that email already. Please, try another."
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = AppDataSource.manager.getRepository(User).create({
      ...userData,
      password: hashedPassword,
    });
    user[0].password = undefined;
    await AppDataSource.manager.getRepository(User).save(user);

    return { user };
  }
}
