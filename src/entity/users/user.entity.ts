import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import "reflect-metadata";
import Post from "../posts/post.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ select: false })
  public password: string;

  @OneToMany(() => Post, (post) => post.author, { cascade: true })
  public posts?: Post[];
}

export default User;
