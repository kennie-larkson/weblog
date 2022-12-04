import "dotenv/config";
//import "reflect-metadata";
import * as dotenv from "dotenv";
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
  host:
    process.env.NODE_ENV === "production" ? POSTGRES_PROD_HOST : "localhost",

  port: 5432,
  username:
    process.env.NODE_ENV === "production" ? POSTGRES_PROD_USER : POSTGRES_USER,
  password:
    process.env.NODE_ENV === "production"
      ? POSTGRES_PROD_PWORD
      : POSTGRES_PASSWORD,
  database:
    process.env.NODE_ENV === "production" ? POSTGRES_PROD_DB : POSTGRES_DB,
  entities: [User, Post, Topic],
  //entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
