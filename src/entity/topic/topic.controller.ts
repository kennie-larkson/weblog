import AppDataSource from "src/data-source";
import express, { NextFunction, Request, Response } from "express";
import Topic from "./topic.entity";
import { ICreateTopic } from "./topic.interface";

export default class TopicController {
  public path = "/topics";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getAllTopics);
    this.router.get(`${this.path}/:id`, this.getTopicById);
    this.router.post(`${this.path}`, this.createTopic);
    this.router.delete(`${this.path}/:id`, this.removeTopic);
    this.router.patch(`${this.path}/:id`, this.updateTopic);
  }

  async getAllTopics(request: Request, response: Response, next: NextFunction) {
    try {
      const topics = await AppDataSource.manager.getRepository(Topic).find();
      return response.json(topics);
    } catch (error) {
      return response.json(error);
    }
  }

  async getTopicById(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    try {
      const topic = AppDataSource.manager.getRepository(Topic).findOneBy({
        id: Number(id),
      });
      if (!topic) {
        return response.json({ message: `Unable to find user with id ${id}` });
      }
      return response.json(topic);
    } catch (error) {
      return response.json(error);
    }
  }

  async createTopic(request: Request, response: Response, next: NextFunction) {
    const topic: ICreateTopic = request.body;

    try {
      const createdTopic = AppDataSource.getRepository(Topic).create(topic);
      const results = await AppDataSource.getRepository(Topic).save(
        createdTopic
      );
      return response.send(results);
    } catch (error) {
      return response.json(error);
    }
  }

  async removeTopic(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;

    try {
      const removedUser = await AppDataSource.getRepository(Topic).delete(id);
      if (removedUser.affected === 0) {
        return response.json(
          `Unable to find topic with id: ${id} for deletion.`
        );
      }
      return response.json({
        message: `Successfully deleted records of topic with id: ${id}.`,
      });
    } catch (error) {
      return response.json(error);
    }
  }

  async updateTopic(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const update: Partial<Topic> = request.body;
    console.log(update);

    try {
      const topicToUpdate = await AppDataSource.getRepository(Topic).findOneBy({
        id: Number(id),
      });
      if (!topicToUpdate) {
        return response.json({ message: `Unable to find topic with id ${id}` });
      }
      AppDataSource.getRepository(Topic).merge(topicToUpdate, update);
      const updatedUser = await AppDataSource.getRepository(Topic).save(
        topicToUpdate
      );

      return response.json({
        message: `Successfully updated data for topic with id: ${id}.`,
        updatedUser,
      });
    } catch (error) {
      return response.json(error);
    }
  }
}
