import User from "entity/users/user.entity";

interface IPost {
  //id: number;
  author: string;
  content: string;
  title: string;
  postOwner: User;
}

export default IPost;
