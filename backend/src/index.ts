import { AppDataSource } from "./data-source";
import { catchError } from "./utils/commonFunctions";
import express from "express";
import cors from "cors";
// import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { __prod__ } from "./utils/constants";
import { buildSchema } from "type-graphql";
import { memberResolver } from "./resolvers/members";
import { myContext } from "./utils/myContext";
import { Redis } from "ioredis";
import { ChannelResolver } from "./resolvers/channels";
import { MessageResolver } from "./resolvers/messages";

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

  const apolloServer = new ApolloServer({
    context: ({ req, res }): myContext => ({
      req,
      res,
      redis,
    }),
    schema: await buildSchema({
      validate: false,
      resolvers: [memberResolver, ChannelResolver, MessageResolver],
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((error) => catchError(error));
