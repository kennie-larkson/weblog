import express from "express";
import IPost from "./post.interface";
import {
  validatePostForm,
  verifyToken,
} from "./../../middleware/validation.middleware";
import PostNotFoundException from "./../../exceptions/PostNotFoundException";
import { RequestType } from "./../../middleware/validation.middleware";

import AppDataSource from "./../../data-source";
import { NextFunction, Request, Response } from "express";
import Post from "./post.entity";
import User from "./../users/user.entity";

export default class PostController {
  public path = "/posts";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, verifyToken, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(
      `${this.path}`,
      verifyToken,
      validatePostForm,
      this.createPost
    );
    this.router.delete(`${this.path}/:id`, this.removePost);
    this.router.patch(`${this.path}/:id`, this.updatePost);
  }

  public async getAllPosts(
    req: RequestType<{
      id: number;
    }>,
    res: Response
  ) {
    const user = await AppDataSource.getRepository(User).findBy({
      id: req.user.id,
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Wrong credentials. Access denied!" });
    }

    try {
      const posts = await AppDataSource.manager
        .getRepository(Post)
        .find({ relations: { author: true } });
      posts.map((post) => delete post.author.password);
      return res.json(posts);
    } catch (error) {
      return res.json(error);
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const post: IPost = await AppDataSource.manager.findOneBy(Post, {
      id: Number(id),
    });
    if (post) {
      return res.status(200).json(post);
    }
    next(new PostNotFoundException(Number(id)));
  }

  async createPost(
    req: RequestType<{ user: User }>,
    res: Response,
    next: NextFunction
  ) {
    console.log(req.user);

    const post: IPost = req.body;

    try {
      const createdPost = AppDataSource.manager
        .getRepository(Post)
        .create({ ...post });
      const result = await AppDataSource.manager
        .getRepository(Post)
        .save(createdPost);
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async removePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    let postToRemove = await AppDataSource.manager.findOneBy(Post, {
      id: Number(id),
    });
    await AppDataSource.manager.remove(postToRemove);
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const update = req.body;
    console.log(update);

    try {
      const postToUpdate = await AppDataSource.getRepository(Post).findOneBy({
        id: Number(id),
      });
      if (!postToUpdate) {
        return res.json({ message: `Unable to find post with id ${id}` });
      }
      AppDataSource.getRepository(Post).merge(postToUpdate, update);
      const updatedPost = await AppDataSource.getRepository(Post).save(
        postToUpdate
      );

      return res.json({
        message: `Successfully updated data for post with id: ${id}.`,
        updatedPost,
      });
    } catch (error) {
      return res.json(error);
    }
  }
}
