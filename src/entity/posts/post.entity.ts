import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import "reflect-metadata";
import User from "../users/user.entity";

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public content: string;

  @Column()
  public title: string;

  @ManyToOne(() => User, (author) => author.posts, { cascade: true })
  public author: User;
}

export default Post;
