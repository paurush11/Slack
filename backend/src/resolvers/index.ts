import { NonEmptyArray } from "type-graphql";
import { ChannelResolver } from "./channels";
import { memberResolver } from "./members";
import { MessageResolver } from "./messages";
import { PostResolver } from "./posts";
import { VoteResolver } from "./vote";
import { SubscriptionResolver } from "./subscriptions";

const resolvers: NonEmptyArray<Function> = [
  memberResolver,
  ChannelResolver,
  MessageResolver,
  PostResolver,
  VoteResolver,
  SubscriptionResolver
];
export default resolvers;
