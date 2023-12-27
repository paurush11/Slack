import { DirectMessage } from "../entity/DirectMessage";
import { Root, Subscription } from "type-graphql";
import { MESSAGE_ADDED_TOPIC } from "./exports";

export class SubscriptionResolver {
  @Subscription({
    topics: MESSAGE_ADDED_TOPIC,
    filter: ({ payload, args }) => payload.channelID === args.channelId,
  })
  newMessage(@Root() messagePayload: DirectMessage): DirectMessage {
    console.log("hi i am here");
    return messagePayload;
  }
}
