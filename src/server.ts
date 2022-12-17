//import "reflect-metadata";
import AuthController from "./authentication/authentication.controller";
import App from "./app";
import PostsController from "./entity/posts/post.controller";
//import TopicController from "./entity/topic/topic.entity";
import UserController from "./entity/users/user.controller";
import { AirbnbController } from "entity/airbnb-be/airbnb.controller";

(async () => {
  const app = new App([
    new PostsController(),
    new UserController(),
    new AuthController(),
    new AirbnbController(),
    //new TopicController(),
  ]);

  app.listen();
})();

//export default app;
