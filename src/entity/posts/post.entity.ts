import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public author?: string;

  @Column()
  public content?: string;

  @Column()
  public title?: string;
}

export default Post;
