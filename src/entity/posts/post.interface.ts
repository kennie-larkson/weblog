import User from "entity/users/user.entity";
import { IUser } from "./../users/user.interface";

interface IPost {
  id?: number;
  content: string;
  title: string;
  author: Partial<IUser>;
}

export default IPost;
