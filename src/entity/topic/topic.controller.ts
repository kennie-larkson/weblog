import AppDataSource from "src/data-source";
import { NextFunction, Request, Response } from "express";
import Topic from "./topic.entity";
import ITopic from "./topic.interface";

export default class TopicController {
  async all(request: Request, response: Response, next: NextFunction) {
    return AppDataSource.manager.find(Topic);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return AppDataSource.manager.findOneBy(Topic, {
      id: Number(request.params.id),
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const topic: ITopic = request.body;
    return AppDataSource.manager.save(topic);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let topicToRemove = await AppDataSource.manager.findOneBy(Topic, {
      id: Number(request.params.id),
    });
    await AppDataSource.manager.remove(topicToRemove);
  }
}
