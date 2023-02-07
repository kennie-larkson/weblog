import { IUser } from "entity/users/user.interface";
import express, { NextFunction, Request, Response, Express } from "express";

class AuthResponseMsg {
  public message: string;

  constructor(message: string) {
    //this.message = "Congratulations! Your registration was successful.";
    this.message = message;
  }

  success_response = (user: IUser): IAuthSuccessMsg => {
    return { message: this.message, user };
  };

  failure_response = (): string => {
    return `${this.message}`;
  };
}

interface IAuthSuccessMsg {
  message: string;
  user: IUser;
}

export default AuthResponseMsg;
