"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
//import "reflect-metadata";
var typeorm_1 = require("typeorm");
var user_entity_1 = __importDefault(require("./entity/users/user.entity"));
var post_entity_1 = __importDefault(require("./entity/posts/post.entity"));
var topic_entity_1 = __importDefault(require("./entity/topic/topic.entity"));
var _a = process.env, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DB = _a.POSTGRES_DB;
var AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [user_entity_1.default, post_entity_1.default, topic_entity_1.default],
    //entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: true,
    logging: false,
});
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map