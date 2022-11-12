import AppDataSource from "./../../data-source";
import express, { NextFunction, Request, Response } from "express";
import User from "./user.entity";
import { ICreateUser, IUpdateUser } from "./user.interface";
import {
  validateUserForm,
  hashPassword,
} from "./../../middleware/validation.middleware";

export default class UserController {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.post(
      `${this.path}`,
      validateUserForm,
      hashPassword,
      this.createUser
    );
    this.router.delete(`${this.path}/:id`, this.removeUser);
    this.router.patch(`${this.path}/:id`, this.updateUser);
  }

  public async getAllUsers(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const users = await AppDataSource.manager.getRepository(User).find();
      return response.json(users);
    } catch (error) {
      return response.json(error);
    }
  }

  async getUserById(request: Request, response: Response, next: NextFunction) {
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
      return response.json(error);
    }
  }

  async createUser(request: Request, response: Response, next: NextFunction) {
    const user: ICreateUser = request.body;

    try {
      const createdUser = AppDataSource.getRepository(User).create(user);
      const results = await AppDataSource.getRepository(User).save(createdUser);
      return response.send(results);
    } catch (error) {
      return response.json(error);
    }
  }

  async removeUser(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    try {
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
      return response.json(error);
    }
  }

  async updateUser(request: Request, response: Response, next: NextFunction) {
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
      return response.json(error);
    }
  }
}

export const userController = new UserController();
