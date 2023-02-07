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

  //@Column({ select: false })
  @Column()
  public password: string;

  @OneToMany(() => Post, (post) => post.author)
  public posts?: Post[];
}

export default User;
