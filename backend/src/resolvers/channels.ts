import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Channel } from "../entity/Channel";
import { AppDataSource } from "../data-source";

@Resolver()
export class ChannelResolver {
  @Query(() => [Channel])
  channel(): Promise<Channel[]> {
    return Channel.find({
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

  @Mutation(() => Channel)
  async createChannel(
    @Arg("name") name: string,
    @Arg("description") description: string,
  ) {
    const cn = await Channel.create({
      Name: name,
      Description: description,
    });
    await AppDataSource.manager.save(cn);
    return cn;
  }
}
