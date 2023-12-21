"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const commonFunctions_1 = require("./utils/commonFunctions");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const constants_1 = require("./utils/constants");
const type_graphql_1 = require("type-graphql");
const members_1 = require("./resolvers/members");
const ioredis_1 = require("ioredis");
const channels_1 = require("./resolvers/channels");
const messages_1 = require("./resolvers/messages");
const express_session_1 = __importDefault(require("express-session"));
const main = async () => {
    data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log("Data Source has been Initialized");
    })
        .catch((error) => (0, commonFunctions_1.catchError)(error));
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true,
    }));
    app.set("trust proxy", !constants_1.__prod__);
    app.set("Access-Control-Allow-Credentials", true);
    const redis = new ioredis_1.Redis();
    const RedisStore = require("connect-redis").default;
    const redisStore = new RedisStore({
        client: redis,
        disableTouch: true,
    });
    app.use((0, express_session_1.default)({
        name: "qid",
        store: redisStore,
        cookie: {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        },
        saveUninitialized: false,
        secret: "yourSecretKey",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [members_1.memberResolver, channels_1.ChannelResolver, messages_1.MessageResolver],
        }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("server started on localhost:4000");
    });
};
main().catch((error) => (0, commonFunctions_1.catchError)(error));
//# sourceMappingURL=index.js.map