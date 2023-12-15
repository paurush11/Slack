import { DataSource } from "typeorm";
import { Channel } from "./entity/Channel";
import { Member } from "./entity/Member";
import { Post } from "./entity/Post";
import { Vote } from "./entity/Vote";
import { Comment } from "./entity/Comment";
import { DirectMessage } from "./entity/DirectMessage";
import { Content } from "./entity/Content";
const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT as String), // some port
  username: process.env.DATASRC_USERNAME,
  password: process.env.DATASRC_PASSWORD,
  database: "slack",
  synchronize: true,
  logging: true,
  entities: [Channel,Member, Post, Vote, Comment, DirectMessage, Content],
  migrations: [],
});

export { AppDataSource };
