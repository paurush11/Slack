import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
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

import { myContext } from "../utils/myContext";

@Resolver()
export class MessageResolver {
  /// This is for sockets

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
    @Ctx() ctx: myContext,
  ) {
    return await DirectMessage.find({
      where: {
        channelID: channelId,
        receiverID: ctx.req.session.user,
      },
      relations: ["sender", "receiver"],
    });
  }
  @Query(() => [DirectMessage])
  async getAllMessagesInChannel(
    @Arg("channelId", () => String) channelId: string,
    @Ctx() ctx: myContext,
  ) {
    const sentMessages = await DirectMessage.find({
      where: {
        channelID: channelId,
        senderId: ctx.req.session.user,
      },
      relations: ["sender", "receiver"],
    });
    const receivedMessages = await DirectMessage.find({
      where: {
        channelID: channelId,
        receiverID: ctx.req.session.user,

      },
      relations: ["sender", "receiver"],
    });

    return [...sentMessages, ...receivedMessages];

  }
  @Query(() => [DirectMessage])
  async getMyMessagesInChannel(
    @Arg("channelId", () => String) channelId: string,
    @Arg("friendId", () => String) friendId: string,
    @Ctx() ctx: myContext,
  ) {
    const sentMessages = await DirectMessage.find({
      where: {
        channelID: channelId,
        senderId: ctx.req.session.user,
        receiverID: friendId
      },
      relations: ["sender", "receiver"],
    });
    const receivedMessages = await DirectMessage.find({
      where: {
        channelID: channelId,
        receiverID: ctx.req.session.user,
        senderId: friendId
      },
      relations: ["sender", "receiver"],
    });
    return [...receivedMessages, ...sentMessages];
  }
  @Query(() => [DirectMessage])
  async getUserMessages(
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
      const messages = await DirectMessage.find({});
      messages.map(async (msg) => {
        await DirectMessage.delete({
          _id: msg._id,
        });
      });

      return true;
    } catch (e) {
      return throwResolverError(e);
      console.error(e);
    }
  }
  @Mutation(() => messageStatus)
  async createMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg("channelId", () => String) channelId: string,
    @Arg("receiverId", () => String) receiverId: string,
    @Ctx() ctx: myContext,
    @Arg("message", () => String) messageText: string,
  ) {
    try {
      const sender = await Member.findOne({
        where: {
          _id: ctx.req.session.user,
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
        const notFoundError = throwNotFoundError("sender");
        return {
          success: false,
          notFoundError: [notFoundError],
        } as messageStatus;
      }
      if (!channel) {
        const notFoundError = throwNotFoundError("channel");
        return {
          success: false,
          notFoundError: [notFoundError],
        } as messageStatus;
      }
      if (!receiver) {
        const notFoundError = throwNotFoundError("receiver");
        return {
          success: false,
          notFoundError: [notFoundError],
        } as messageStatus;
      }

      const message = await DirectMessage.create({
        channelID: channelId,
        senderId: ctx.req.session.user,
        receiverID: receiverId,
        TextMessage: messageText,
        sender: sender,
        receiver: receiver,
        channel: channel,
      });

      await message.save();
      const savedMessage = await DirectMessage.findOne({
        where: {
          channelID: channelId,
          senderId: ctx.req.session.user,
          receiverID: receiverId,
          TextMessage: messageText,
        },
        relations: ["sender", "receiver"]
      });

      await pubSub.publish(MESSAGE_ADDED_TOPIC, savedMessage);

      return {
        success: true,
        data: message,
      } as messageStatus;
    } catch (e) {
      const resolverError = throwResolverError(e);
      return {
        success: false,
        resolverError: [resolverError],
      } as messageStatus;
    }
  }

  @Mutation(() => messageStatus || resolverError)
  async updateMessage(
    @Arg("channelId", () => String) messageId: string,
    @Arg("message", () => String) messageText: string,
    @PubSub() pubSub: PubSubEngine,
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
      await pubSub.publish(MESSAGE_UPDATED_TOPIC, message);

      return {
        success: true,
        data: message,
      } as messageStatus;
    } catch (e) {
      return throwResolverError(e);
    }
  }

  @Mutation(() => messageStatus || resolverError)
  async deleteMessage(
    @Arg("id", () => String) message_Id: string,
    @PubSub() pubSub: PubSubEngine,
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
      await pubSub.publish(MESSAGE_DELETED_TOPIC, message);

      return {
        success: true,
        data: message,
      } as messageStatus;
    } catch (e) {
      return throwResolverError(e);
    }
  }

  @Mutation(() => messageStatus || resolverError)
  async seeMessage(
    @Arg("id", () => String) message_Id: string,
    @PubSub() pubSub: PubSubEngine,
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
      await pubSub.publish(MESSAGE_SEEN_TOPIC, message);
      return {
        success: true,
        data: message,
      } as messageStatus;
    } catch (e) {
      return throwResolverError(e);
    }
  }
}
