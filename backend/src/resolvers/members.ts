import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver
} from "type-graphql";
import { AppDataSource } from "../data-source";
import { Channel } from "../entity/Channel";
import { Member } from "../entity/Member";
import {
  throwNotFoundError,
  throwResolverError,
} from "../utils/commonFunctions";
import { myContext } from "../utils/myContext";
import { UserCreationInput, UserResponse, resolverError } from "./exports";

@Resolver()
export class memberResolver {
  @Query(() => [Member])
  users(): Promise<Member[]> {
    return Member.find({
      relations: ["channels"],
    });
  }

  @Mutation(() => Boolean)
  async clearUsers() {
    // await Member.clear()
    await AppDataSource.createQueryRunner().query(
      "TRUNCATE TABLE member CASCADE",
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async createUser(
    @Ctx() ctx: myContext,
    @Arg("data", () => UserCreationInput) data: UserCreationInput,
    @Arg("password", () => String) password: string,
  ) {
    const hashedPassword = await argon2.hash(password);
    const user = await Member.create({ ...data, password: hashedPassword });
    try {
      await user.save();
    } catch (Error) {
      return { errors: [throwResolverError(Error)] };
    }
    return { user };
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
        relations:["members"]
      });
      const user = await Member.findOne({
        where: {
          _id: userId,
        },
        relations:["channels"]
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
      if(channel.members.filter((member)=>member._id ===  userId).length !== 0  &&  user.channels.filter((channel)=>channel._id ===  channelId).length !== 0){
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
        relations:["members"]
      });
      const user = await Member.findOne({
        where: {
          _id: userId,
        },
        relations:["channels"]
      });
      if (!channel) {
        return throwNotFoundError("channel");
      }
      if (!user) {
        return throwNotFoundError("user");
      }

      if (!channel.members || channel.members.filter((member)=>member._id ===  userId).length === 0) {
        return throwNotFoundError("user in channel");
      }
      channel.members  = channel.members.filter((user) => user._id !== userId);
      await channel.save();
      return true;
    } catch (e) {
      return throwResolverError(e);
    }
  }
}
export { resolverError };

