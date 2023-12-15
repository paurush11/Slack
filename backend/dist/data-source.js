"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Channel_1 = require("./entity/Channel");
const Member_1 = require("./entity/Member");
const Post_1 = require("./entity/Post");
const Vote_1 = require("./entity/Vote");
const Comment_1 = require("./entity/Comment");
const DirectMessage_1 = require("./entity/DirectMessage");
const Content_1 = require("./entity/Content");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DATASRC_USERNAME,
    password: process.env.DATASRC_PASSWORD,
    database: "slack",
    synchronize: true,
    logging: true,
    entities: [Channel_1.Channel, Member_1.Member, Post_1.Post, Vote_1.Vote, Comment_1.Comment, DirectMessage_1.DirectMessage, Content_1.Content],
    migrations: [],
});
exports.AppDataSource = AppDataSource;
//# sourceMappingURL=data-source.js.map