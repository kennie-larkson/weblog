import bcrypt from "bcrypt";
import { userController } from "entity/users/user.controller";
import { ICreateUser } from "entity/users/user.interface";
import jwt from "jsonwebtoken";
import AppDataSource from "./../data-source";
import User from "./../entity/users/user.entity";
import ITokenData from "./../interfaces/tokenData.interface";
import IDataStoredInToken from "./../interfaces/dataStoredInToken.interface";

export default class AuthenticationService {
  public async register(userData: ICreateUser) {
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
    await AppDataSource.manager.getRepository(User).save(user);
    delete user.password;
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { user, cookie };
  }

  public createToken(user: User): ITokenData {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: IDataStoredInToken = { id: user.id };

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, {}) };
  }

  public createCookie(tokenData: ITokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}
