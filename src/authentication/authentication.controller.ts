import express, { Request, Response, NextFunction } from "express";
import AuthenticationService from "./authentication.service";
import { ICreateUser } from "./../entity/users/user.interface";
import { validateUserForm } from "./../middleware/validation.middleware";

//console.log(process.env.POSTGRES_DB);
export default class AuthController {
  private authService = new AuthenticationService();
  public path = "/auth";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validateUserForm,
      this.registerUser
    );
  }

  /**
   * async register
   */
  public async registerUser(req: Request, res: Response, next: NextFunction) {
    const userData: ICreateUser = req.body;
    try {
      const { user } = await this.authService.register(
        userData,
        req,
        res,
        next
      );
      return res.send(user);
    } catch (error) {
      next(error);
    }
  }
}
