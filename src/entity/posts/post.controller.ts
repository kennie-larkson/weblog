import express from "express";
import IPost from "./post.interface";

import AppDataSource from "./../../data-source";
import { NextFunction, Request, Response } from "express";
import Post from "./post.entity";

export default class PostController {
  public path = "/post";
  public router = express.Router();

  async all(request: Request, response: Response, next: NextFunction) {
    return AppDataSource.manager.find(Post);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    return AppDataSource.manager.findOneBy(Post, { id: Number(id) });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const post: IPost = request.body;
    return AppDataSource.manager.save(post);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    let postToRemove = await AppDataSource.manager.findOneBy(Post, {
      id: Number(id),
    });
    await AppDataSource.manager.remove(postToRemove);
  }
}
