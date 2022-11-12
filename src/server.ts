//import "reflect-metadata";
import App from "./app";
import PostsController from "./entity/posts/post.controller";
import TopicController from "./entity/topic/topic.entity";
import UserController from "./entity/users/user.controller";

(async () => {
  const app = new App([
    new PostsController(),
    new UserController(),
    //new TopicController(),
  ]);

  app.listen();
})();

//export default app;
