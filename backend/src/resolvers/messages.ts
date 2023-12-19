import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { DirectMessage } from "../entity/DirectMessage";
import {
  MESSAGE_ADDED_TOPIC,
  MESSAGE_DELETED_TOPIC,
  MESSAGE_SEEN_TOPIC,
  MESSAGE_UPDATED_TOPIC,
  messageStatus,
  resolverError,
} from "./exports";
import {
  throwNotFoundError,
  throwResolverError,
} from "../utils/commonFunctions";
import { Member } from "../entity/Member";
import { Channel } from "../entity/Channel";
import { PubSub } from "graphql-subscriptions";

const pubSub = new PubSub();
@Resolver()
export class MessageResolver {
  /// This is for sockets
  ///Message added
  @Subscription(() => DirectMessage, {
    topics: MESSAGE_ADDED_TOPIC,
  })
  async newMessage(
    @Root() messagePayload: DirectMessage,
  ): Promise<DirectMessage> {
    return messagePayload;
  }

  ///Message updated
  @Subscription(() => DirectMessage, {
    topics: MESSAGE_UPDATED_TOPIC,
  })
  async messageUpdated(
    @Root() updatePayload: DirectMessage,
  ): Promise<DirectMessage> {
    return updatePayload;
  }

  ///Message deleted
  @Subscription(() => DirectMessage, {
    topics: MESSAGE_DELETED_TOPIC,
  })
  async messageDeleted(
    @Root() deletePayload: DirectMessage,
  ): Promise<DirectMessage> {
    return deletePayload;
  }

  ///Message seen
  @Subscription(() => DirectMessage, {
    topics: MESSAGE_SEEN_TOPIC,
  })
  async messageSeen(
    @Root() deletePayload: DirectMessage,
  ): Promise<DirectMessage> {
    return deletePayload;
  }

  @Query(() => [DirectMessage])
  async getAll() {
    const messages = await DirectMessage.find({
      relations: ["sender", "receiver"],
    });
    console.log(messages);
    return messages;
  }

  @Query(() => [DirectMessage])
  async getAllReceivedMessages(
    @Arg("channelId", () => String) channelId: string,
    @Arg("userId", () => String) userId: string,
  ) {
    return await DirectMessage.find({
      where: {
        channelID: channelId,
        receiverID: userId,
      },
      relations: ["sender", "receiver"],
    });
  }
  @Query(() => [DirectMessage])
  async getAllSentMessages(
    @Arg("channelId", () => String) channelId: string,
    @Arg("userId", () => String) userId: string,
  ) {
    return await DirectMessage.find({
      where: {
        channelID: channelId,
        senderId: userId,
      },
      relations: ["sender", "receiver"],
    });
  }
  @Query(() => [DirectMessage])
  async getAllUserMessages(
    @Arg("channelId", () => String) channelId: string,
    @Arg("userId", () => String) userId: string,
    @Arg("senderId", () => String) senderId: string,
  ) {
    return await DirectMessage.find({
      where: {
        channelID: channelId,
        senderId: senderId,
        receiverID: userId,
      },
      relations: ["sender", "receiver"],
    });
  }

  @Mutation(() => Boolean || resolverError)
  async deleteMessageTable() {
    try {
      await DirectMessage.clear();
      return true;
    } catch (e) {
      return throwResolverError(e);
    }
  }

  @Mutation(() => DirectMessage || resolverError)
  async createMessage(
    @Arg("channelId", () => String) channelId: string,
    @Arg("receiverId", () => String) receiverId: string,
    @Arg("senderId", () => String) senderId: string,
    @Arg("message", () => String) messageText: string,
  ) {
    try {
      const sender = await Member.findOne({
        where: {
          _id: senderId,
        },
      });
      const receiver = await Member.findOne({
        where: {
          _id: receiverId,
        },
      });
      const channel = await Channel.findOne({
        where: {
          _id: channelId,
        },
      });
      if (!sender) {
        throwNotFoundError("sender");
        return;
      }
      if (!channel) {
        throwNotFoundError("channel");
        return;
      }
      if (!receiver) {
        throwNotFoundError("receiver");
        return;
      }

      const message = await DirectMessage.create({
        channelID: channelId,
        senderId: senderId,
        receiverID: receiverId,
        TextMessage: messageText,
        sender: sender,
        receiver: receiver,
        channel: channel,
      });

      await message.save();
      await pubSub.publish(MESSAGE_ADDED_TOPIC, { newMessage: message });
      console.log(message);
      return message;
    } catch (e) {
      return throwResolverError(e);
    }
  }

  @Mutation(() => messageStatus || resolverError)
  async updateMessage(
    @Arg("channelId", () => String) messageId: string,
    @Arg("message", () => String) messageText: string,
  ) {
    try {
      const message = await DirectMessage.findOne({
        where: {
          _id: messageId,
        },
      });
      if (!message) {
        const errorMsg = throwNotFoundError("message");
        return {
          success: false,
          error: [
            {
              message: errorMsg.message,
              item: errorMsg.item,
            },
          ],
        } as messageStatus;
      }
      message.TextMessage = messageText;
      await message.save();
      await pubSub.publish(MESSAGE_UPDATED_TOPIC, { messageUpdated: message });

      return {
        success: true,
        data: message,
      } as messageStatus;
    } catch (e) {
      return throwResolverError(e);
    }
  }

  @Mutation(() => messageStatus || resolverError)
  async deleteMessage(@Arg("id", () => String) message_Id: string
    ) {
    try {
      const message = await DirectMessage.findOne({
        where: {
            _id: message_Id,
        },
      });
      if (!message) {
        const errorMsg = throwNotFoundError("message");
        return {
          success: false,
          error: [
            {
              message: errorMsg.message,
              item: errorMsg.item,
            },
          ],
        } as messageStatus;
      }
      await DirectMessage.delete({
        _id: message_Id,
      });
      await pubSub.publish(MESSAGE_DELETED_TOPIC, { messageDeleted: message });

      return {
        success: true,
        data: message,
      } as messageStatus;
    } catch (e) {
      return throwResolverError(e);
    }
  }

  @Mutation(() => messageStatus || resolverError)
  async seeMessage(@Arg("id", () => String) message_Id: string) {
    try {
      const message = await DirectMessage.findOne({
        where: {
          _id: message_Id,
        },
      });
      if (!message) {
        const errorMsg = throwNotFoundError("message");
        return {
          success: false,
          error: [
            {
              message: errorMsg.message,
              item: errorMsg.item,
            },
          ],
        } as messageStatus;
      }
      if (message.receiverSeen) {
        return {
            success: false,
            error: [
              {
                message: "already seen",
                item: "message",
              },
            ],
          } as messageStatus;
        
      }
      message.receiverSeen = true;
      await message.save();
      await pubSub.publish(MESSAGE_SEEN_TOPIC, { messageSeen: message });
      return {
        success: true,
        data: message,
      } as messageStatus;
    } catch (e) {
      return throwResolverError(e);
    }
  }
}
