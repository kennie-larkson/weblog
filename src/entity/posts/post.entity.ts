import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import "reflect-metadata";
import User from "../users/user.entity";

@Entity()
class Post {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public author?: string;

  @Column()
  public content?: string;

  @Column()
  public title?: string;

  @ManyToOne(() => User, (postOwner) => postOwner.posts)
  postOwner!: User;
}

export default Post;
