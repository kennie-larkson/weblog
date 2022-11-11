import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import IController from "./interfaces/controller.interface";
import AppDataSource from "./data-source";
import { userController } from "./entity/users/user.controller";

class App {
  public app: express.Application;

  constructor(controllers: IController[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.home();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectToTheDatabase() {
    AppDataSource.initialize().then(() =>
      console.log(
        `
/////////////////////////////////////////////        
Database connection successfull!
////////////////////////////////////////////
      `
      )
    );
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller: any) => {
      this.app.use("/", controller.router);
    });
  }

  private home() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to weblog!");
    });
  }

  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(
        `
///////////////////////////////////////
App listening on port ${process.env.PORT}
//////////////////////////////////////
      `
      );
    });
  }
}

export default App;
