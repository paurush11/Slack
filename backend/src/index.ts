import cors from "cors";
import express from "express";
import { AppDataSource } from "./data-source";
import { catchError } from "./utils/commonFunctions";
// import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import session from "express-session";
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { Redis } from "ioredis";
import { buildSchema } from "type-graphql";
import { WebSocketServer } from 'ws';
import { __prod__ } from "./utils/constants";
import { myContext } from "./utils/myContext";

import resolvers from "./resolvers";
require("dotenv").config();
const main = async () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been Initialized");
    })
    .catch((error) => catchError(error));
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
  );

  app.set("trust proxy", !__prod__);
  app.set("Access-Control-Allow-Credentials", true);

  const redis = new Redis();
  const RedisStore = require("connect-redis").default;
  const redisStore = new RedisStore({
    client: redis,
    disableTouch: true,
  });

  app.use(
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
  );

  const schema = await buildSchema({
    validate: false,
    resolvers: resolvers
  })
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/subscriptions',
  });
  const serverCleanup = useServer({ schema }, wsServer);
  const apolloServer = new ApolloServer({
    context: ({ req, res }): myContext => ({
      req,
      res,
      redis,
    }),
    schema: schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      // Proper shutdown for the WebSocket server.
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
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log("server started on localhost:4001");
  });
  httpServer.listen(4001, () => {
    console.log(`🚀 Server ready at http://localhost:4001${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:4001${apolloServer.graphqlPath}`);

  })
};

main().catch((error) => catchError(error));


