import express, { Request, Response, NextFunction } from "express";
import AuthenticationService from "./authentication.service";
import { ICreateUser } from "./../entity/users/user.interface";
import { validateUserForm } from "./../middleware/validation.middleware";
import AuthresponseMsg from "./authsuccessmsg";
import ISignInData from "interfaces/signIn.interface";

export default class AuthController {
  public path = "/auth";
  public router = express.Router();
  private authService = new AuthenticationService();
  private successMsg = new AuthresponseMsg(
    "Congratulations! Your registration was successful."
  );
  private failureMsg = new AuthresponseMsg(
    "Sorry! Your registration was not successful."
  );

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validateUserForm,
      this.registration
    );

    this.router.post(`${this.path}/signIn`, this.signIn);
  }

  private registration = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const userData: ICreateUser = request.body;
    try {
      const { cookie, user } = await this.authService.register(userData);
      if (!user || !cookie) {
        response.status(500).json(this.failureMsg.failure_response());
        return;
      }

      response.setHeader("Set-Cookie", [cookie]);

      response.status(201).json(this.successMsg.success_response(user));
      return;
      //response.status(201).json(authSuccessMsg(response, user));
    } catch (error) {
      next(error);
    }
  };

  private signIn = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const data: ISignInData = request.body;

    try {
      const { user, cookie } = await this.authService.authenticate(
        data,
        response
      );
      if (!user || !cookie) {
        response
          .status(400)
          .json("Unable to sign in. Kindly confirm your credentials. ");
        return;
      }
      response.setHeader("Set-Cookie", [cookie]);
      response.status(200).json({ message: "User login successful", user });
    } catch (error) {
      next(error);
    }
  };
}
