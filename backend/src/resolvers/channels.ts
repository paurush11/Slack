import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Channel } from "../entity/Channel";
import { Member } from "../entity/Member";
import {
  throwNotFoundError,
  throwResolverError,
} from "../utils/commonFunctions";
import { ChannelResponse, resolverError } from "./exports";

@Resolver()
export class ChannelResolver {
  @Query(() => [Channel])
  channels(): Promise<Channel[]> {
    return Channel.find({
      relations: ["members"],
    });
  }

  @Query(() => Channel)
  getChannel(
    @Arg("channelId", () => String) channelId: string
  ) {
    console.log(channelId)

    return Channel.findOne({
      where: {
        _id: channelId
      },
      relations: ["members"],
    });

  }

  @Mutation(() => Boolean)
  async clearChannels() {
    // await Channel.clear();
    await AppDataSource.createQueryRunner().query(
      "TRUNCATE TABLE channel CASCADE",
    );
    return true;
  }

  @Mutation(() => Boolean)
  async deleteChannel(@Arg("channelId", () => String) channelId: string) {
    // await Channel.clear();
    await Channel.delete({
      _id: channelId,
    });
    return true;
  }

  @Mutation(() => ChannelResponse)
  async createChannel(
    @Arg("name") name: string,
    @Arg("iconName") icon: string,
    @Arg("description") description: string,
  ) {
    const exists = await Channel.findOne({
      where: {
        Name: name,
        IconName: icon,
        Description: description,
      },
    });
    if (exists) {
      return {
        errors: [
          {
            message: "Found",
            item: "channel",
          },
        ],
      };
    }
    const cn = await Channel.create({
      Name: name,
      IconName: icon,
      Description: description,
    });
    await cn.save();
    return { channel: cn };
  }

  @Mutation(() => Boolean || resolverError)
  async joinChannel(
    @Arg("channelId", () => String) channelId: string,
    @Arg("userId", () => String) userId: string,
  ) {
    try {
      const channel = await Channel.findOne({
        where: {
          _id: channelId,
        },
        relations: ["members"],
      });
      const user = await Member.findOne({
        where: {
          _id: userId,
        },
        relations: ["channels"],
      });

      if (!channel) {
        return throwNotFoundError("channel");
      }
      if (!user) {
        return throwNotFoundError("user");
      }

      if (!channel.members) {
        channel.members = [];
      }
      if (!user.channels) {
        user.channels = [];
      }
      if (
        channel.members.filter((member) => member._id === userId).length !==
        0 &&
        user.channels.filter((channel) => channel._id === channelId).length !==
        0
      ) {
        return true;
      }
      channel.members.push(user);
      await channel.save();
      return true;
    } catch (e) {
      return throwResolverError(e);
    }
  }

  @Mutation(() => Boolean || resolverError)
  async leaveChannel(
    @Arg("channelId", () => String) channelId: string,
    @Arg("userId", () => String) userId: string,
  ) {
    try {
      const channel = await Channel.findOne({
        where: {
          _id: channelId,
        },
        relations: ["members"],
      });
      const user = await Member.findOne({
        where: {
          _id: userId,
        },
        relations: ["channels"],
      });
      if (!channel) {
        return throwNotFoundError("channel");
      }
      if (!user) {
        return throwNotFoundError("user");
      }

      if (
        !channel.members ||
        channel.members.filter((member) => member._id === userId).length === 0
      ) {
        return throwNotFoundError("user in channel");
      }
      channel.members = channel.members.filter((user) => user._id !== userId);
      await channel.save();
      return true;
    } catch (e) {
      return throwResolverError(e);
    }
  }



}
