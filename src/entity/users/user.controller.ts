import AppDataSource from "./../../data-source";
import express, { NextFunction, Request, Response } from "express";
import User from "./user.entity";
import { ICreateUser, IUpdateUser } from "./user.interface";
import {
  validateUserForm,
  hashPassword,
} from "./../../middleware/validation.middleware";
import Post from "./../posts/post.entity";

export default class UserController {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.post(`${this.path}/email`, this.getUserByEmail);
    this.router.delete(`${this.path}/:id`, this.removeUser);
    this.router.delete(`${this.path}`, this.removeAllUsers);
    this.router.patch(`${this.path}/:id`, this.updateUser);
  }

  public async getAllUsers(_request: Request, response: Response) {
    try {
      const users = await AppDataSource.manager.getRepository(User).find({
        relations: { posts: true },
      });
      users.map((user) => delete user.password);
      return response.status(200).json(users);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Server error" });
    }
  }

  async getUserById(request: Request, response: Response) {
    const { id } = request.params;
    console.log(id);
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({
        id: Number(id),
      });
      if (!user) {
        return response.json({ message: `Unable to find user with id ${id}` });
      }

      return response.json(user);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Server error" });
    }
  }

  async getUserByEmail(request: Request, response: Response) {
    const { email } = request.body;
    console.log(email);
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({
        email: email,
      });
      if (!user) {
        return response.json({
          message: `Unable to find user with email: ${email}`,
        });
      }

      return response.json(user);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Server error" });
    }
  }

  async removeUser(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await AppDataSource.getRepository(Post).delete({ author: { id: +id } });
      const removedUser = await AppDataSource.getRepository(User).delete(id);

      if (removedUser.affected === 0) {
        return response.json(
          `Unable to find user with id: ${id} for deletion.`
        );
      }
      return response.json({
        message: `Successfully deleted records of user with id: ${id}.`,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Server error." });
    }
  }

  async updateUser(request: Request, response: Response) {
    const { id } = request.params;
    const update: IUpdateUser = request.body;
    console.log(update);

    try {
      const userToUpdate = await AppDataSource.getRepository(User).findOneBy({
        id: Number(id),
      });
      if (!userToUpdate) {
        return response.json({ message: `Unable to find user with id ${id}` });
      }
      AppDataSource.getRepository(User).merge(userToUpdate, update);
      const updatedUser = await AppDataSource.getRepository(User).save(
        userToUpdate
      );

      return response.json({
        message: `Successfully updated data for user with id: ${id}.`,
        updatedUser,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Server error." });
    }
  }

  async removeAllUsers(request: Request, response: Response) {
    try {
      await AppDataSource.getRepository(Post).clear();
      await AppDataSource.getRepository(User).clear();
      response.status(200).json({ message: "Users successfully deleted." });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Server error." });
    }
  }
}

export const userController = new UserController();
