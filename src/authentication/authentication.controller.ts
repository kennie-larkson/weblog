import express, { Request, Response, NextFunction } from "express";
import AuthenticationService from "./authentication.service";
import { ICreateUser } from "./../entity/users/user.interface";
import { validateUserForm } from "./../middleware/validation.middleware";

export default class AuthController {
  public path = "/auth";
  public router = express.Router();
  private authService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validateUserForm,
      this.registration
    );
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData: ICreateUser = request.body;
    try {
      const { cookie, user } = await this.authService.register(userData);
      // console.log({ user, cookie });
      response.setHeader("Set-Cookie", [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  };
}
