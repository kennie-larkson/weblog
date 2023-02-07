import bcrypt from "bcrypt";
import { Response } from "express";
import { ICreateUser } from "entity/users/user.interface";
import jwt from "jsonwebtoken";
import AppDataSource from "./../data-source";
import User from "./../entity/users/user.entity";
import ITokenData from "./../interfaces/tokenData.interface";
import IDataStoredInToken from "./../interfaces/dataStoredInToken.interface";
import ThereIsAlreadyAUserWithThatEmail from "../exceptions/DuplicateEmailRegistrationException";
import ISignInData from "interfaces/signIn.interface";

export default class AuthenticationService {
  public async register(userData: ICreateUser) {
    if (
      await AppDataSource.manager
        .getRepository(User)
        .findOneBy({ email: userData.email })
    ) {
      throw new ThereIsAlreadyAUserWithThatEmail(userData.email);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = AppDataSource.manager.getRepository(User).create({
      ...userData,
      password: hashedPassword,
    });

    await AppDataSource.manager.getRepository(User).save(user);
    delete user.password;
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { user, cookie };
  }

  public createToken(user: User): ITokenData {
    // const expiresIn = 3600; // an hour
    const expiresIn = 360; // 5 mins
    const secret = process.env.JWT_SECRET;
    const payload: IDataStoredInToken = { user: { id: user.id } };
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    return {
      expiresIn,
      token,
    };
  }

  public createCookie(tokenData: ITokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  public async authenticate(signInData: ISignInData, res: Response) {
    const { email, password } = signInData;

    try {
      const user = await AppDataSource.manager
        .getRepository(User)
        .findOneBy({ email });

      if (!user) {
        throw new Error("Kindly enter the correct email for your account.");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("The password doesn't match");
      }

      const tokenData = this.createToken(user);
      const cookie = this.createCookie(tokenData);
      delete user.password;

      return { user, cookie };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
