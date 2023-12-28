import { DirectMessage } from "../entity/DirectMessage";
import { Arg, Root, Subscription } from "type-graphql";
import { MESSAGE_ADDED_TOPIC, MESSAGE_DELETED_TOPIC, MESSAGE_SEEN_TOPIC, MESSAGE_UPDATED_TOPIC } from "./exports";

export class SubscriptionResolver {
   ///Message added
   @Subscription(() => DirectMessage, {
    topics: MESSAGE_ADDED_TOPIC,
    filter: ({ payload, args }) => payload.channelID === args.channelId,
  })
  async newMessage(
    @Root() messagePayload: DirectMessage,
    @Arg("channelId", () => String) channelId: string,
  ): Promise<DirectMessage> {
    console.log('Subscription payload received:', messagePayload);
    return messagePayload;
  }
   @Subscription(() => DirectMessage, {
    topics: MESSAGE_ADDED_TOPIC,
  })
  async newMessageArrived(
    @Root() messagePayload: DirectMessage,
  ): Promise<DirectMessage> {
    console.log('Subscription payload received:', messagePayload);
    return messagePayload;
  }
  ///Message updated
  @Subscription(() => DirectMessage, {
    topics: MESSAGE_UPDATED_TOPIC,
    filter: ({ payload, args }) => payload.channelID === args.channelId,
  })
  async messageUpdated(
    @Root() updatePayload: DirectMessage,
    @Arg("channelId", () => String) channelId: string,
  ): Promise<DirectMessage> {
    return updatePayload;
  }
  ///Message deleted
  @Subscription(() => DirectMessage, {
    topics: MESSAGE_DELETED_TOPIC,
    filter: ({ payload, args }) => payload.channelID === args.channelId,
  })
  async messageDeleted(
    @Root() deletePayload: DirectMessage,
    @Arg("channelId", () => String) channelId: string,
  ): Promise<DirectMessage> {
    return deletePayload;
  }
  ///Message seen
  @Subscription(() => DirectMessage, {
    topics: MESSAGE_SEEN_TOPIC,
    filter: ({ payload, args }) => payload.channelID === args.channelId,
  })
  async messageSeen(
    @Root() deletePayload: DirectMessage,
    @Arg("channelId", () => String) channelId: string,
  ): Promise<DirectMessage> {
    return deletePayload;
  }
}
