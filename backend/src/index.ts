import cors from "cors";
import express from "express";
import { AppDataSource } from "./data-source";
import { catchError } from "./utils/commonFunctions";
// import Redis from "ioredis";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import session from "express-session";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { Redis } from "ioredis";
import { buildSchema } from "type-graphql";
import { WebSocketServer } from "ws";
import resolvers from "./resolvers";
import { __prod__ } from "./utils/constants";
import { printSchema } from "graphql";
require("dotenv").config();

const main = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been Initialized");
    })
    .catch((error) => catchError(error));

  const schema = await buildSchema({
    validate: false,
    resolvers: resolvers,
  });

  const app = express();
  const httpServer = createServer(app);

  app.set("trust proxy", !__prod__);
  app.set("Access-Control-Allow-Credentials", true);

  const redis = new Redis();
  const RedisStore = require("connect-redis").default;
  const redisStore = new RedisStore({
    client: redis,
    disableTouch: true,
  });

  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: "/subscriptions",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema: schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
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

  app.use(
    "/graphql",
    session({
      name: process.env.COOKIE_NAME as string, // session cookie name
      store: redisStore,
      cookie: {
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, /// 10 years
        httpOnly: true,
        secure: true, /// cookie only works in HTTPS
        sameSite: "none",
      },
      saveUninitialized: false,
      secret: "yourSecretKey", // replace with your secret key
      resave: false,
    }),
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res, redis }),
    }),
  );

  httpServer.listen(4000, () => {
    console.log(`Server is now running on http://localhost:${4000}/graphql`);
  });
};

main().catch((error) => catchError(error));
