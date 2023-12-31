"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const commonFunctions_1 = require("./utils/commonFunctions");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_session_1 = __importDefault(require("express-session"));
const ws_1 = require("graphql-ws/lib/use/ws");
const http_1 = require("http");
const ioredis_1 = require("ioredis");
const type_graphql_1 = require("type-graphql");
const ws_2 = require("ws");
const resolvers_1 = __importDefault(require("./resolvers"));
const constants_1 = require("./utils/constants");
require("dotenv").config();
const main = async () => {
    data_source_1.AppDataSource.initialize()
        .then(() => {
        console.log("Data Source has been Initialized");
    })
        .catch((error) => (0, commonFunctions_1.catchError)(error));
    const schema = await (0, type_graphql_1.buildSchema)({
        validate: false,
        resolvers: resolvers_1.default,
    });
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    app.set("trust proxy", !constants_1.__prod__);
    app.set("Access-Control-Allow-Credentials", true);
    const redis = new ioredis_1.Redis();
    const RedisStore = require("connect-redis").default;
    const redisStore = new RedisStore({
        client: redis,
        disableTouch: true,
    });
    const wsServer = new ws_2.WebSocketServer({
        server: httpServer,
        path: "/subscriptions",
    });
    const serverCleanup = (0, ws_1.useServer)({ schema }, wsServer);
    const apolloServer = new server_1.ApolloServer({
        schema: schema,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    await apolloServer.start();
    app.use("/graphql", (0, express_session_1.default)({
        name: process.env.COOKIE_NAME,
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
    }), (0, cors_1.default)({
        origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        credentials: true,
    }), express_1.default.json(), (0, express4_1.expressMiddleware)(apolloServer, {
        context: async ({ req, res }) => ({ req, res, redis }),
    }));
    httpServer.listen(4000, () => {
        console.log(`Server is now running on http://localhost:${4000}/graphql`);
    });
};
main().catch((error) => (0, commonFunctions_1.catchError)(error));
//# sourceMappingURL=index.js.map