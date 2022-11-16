import express from "express";
import IPost from "./post.interface";
import { validatePostForm } from "./../../middleware/validation.middleware";

import AppDataSource from "./../../data-source";
import { NextFunction, Request, Response } from "express";
import Post from "./post.entity";

export default class PostController {
  public path = "/posts";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.post(`${this.path}`, validatePostForm, this.createPost);
    this.router.delete(`${this.path}/:id`, this.removePost);
    this.router.patch(`${this.path}/:id`, this.updatePost);
  }

  public async getAllPosts(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const posts = await AppDataSource.manager
        .getRepository(Post)
        .find({ relations: { postOwner: true } });
      return response.json(posts);
    } catch (error) {
      return response.json(error);
    }
  }

  async getPostById(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    return AppDataSource.manager.findOneBy(Post, { id: Number(id) });
  }

  async createPost(request: Request, response: Response, next: NextFunction) {
    const post: IPost = request.body;
    //const post = request.body;
    try {
      const createdPost = AppDataSource.manager
        .getRepository(Post)
        .create(post);
      const result = await AppDataSource.manager
        .getRepository(Post)
        .save(createdPost);
      return response.json(result);
    } catch (error) {
      return response.json(error);
    }
  }

  async removePost(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    let postToRemove = await AppDataSource.manager.findOneBy(Post, {
      id: Number(id),
    });
    await AppDataSource.manager.remove(postToRemove);
  }

  async updatePost(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const update = request.body;
    console.log(update);

    try {
      const postToUpdate = await AppDataSource.getRepository(Post).findOneBy({
        id: Number(id),
      });
      if (!postToUpdate) {
        return response.json({ message: `Unable to find post with id ${id}` });
      }
      AppDataSource.getRepository(Post).merge(postToUpdate, update);
      const updatedPost = await AppDataSource.getRepository(Post).save(
        postToUpdate
      );

      return response.json({
        message: `Successfully updated data for post with id: ${id}.`,
        updatedPost,
      });
    } catch (error) {
      return response.json(error);
    }
  }
}
