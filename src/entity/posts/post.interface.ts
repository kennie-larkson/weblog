import User from "entity/users/user.entity";

interface IPost {
  content: string;
  title: string;
  author: Partial<User>;
}

export default IPost;
