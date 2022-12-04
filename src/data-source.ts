import "dotenv/config";
//import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./entity/users/user.entity";
import Post from "./entity/posts/post.entity";
import Topic from "./entity/topic/topic.entity";

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PROD_HOST,
  POSTGRES_PROD_USER,
  POSTGRES_PROD_PWORD,
  POSTGRES_PROD_DB,
} = process.env;

const AppDataSource = new DataSource({
  type: "postgres",
  //host: "localhost",
  host: POSTGRES_PROD_HOST,
  port: 5432,
  //username: POSTGRES_USER,
  username: POSTGRES_PROD_USER,
  password: POSTGRES_PROD_PWORD,
  // password: POSTGRES_PASSWORD,
  database: POSTGRES_PROD_DB,
  entities: [User, Post, Topic],
  //entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
