import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import "reflect-metadata";
import Post from "../posts/post.entity";

@Entity()
class User {
  //[x: string]: any;
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name?: string;

  @Column()
  public email?: string;

  @Column({ select: false })
  public password?: string;

  @OneToMany(() => Post, (post) => post.postOwner, { cascade: true })
  posts!: Post[];
}

export default User;
