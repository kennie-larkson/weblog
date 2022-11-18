import "dotenv/config";
//import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./entity/users/user.entity";
import Post from "./entity/posts/post.entity";
import Topic from "./entity/topic/topic.entity";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User, Post, Topic],
  //entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
