//import "reflect-metadata";
import App from "./app";
import PostsController from "./entity/posts/post.controller";
import UserController from "./entity/users/user.controller";

(async () => {
  const app = new App([new PostsController(), new UserController()]);

  app.listen();
})();

//export default app;
