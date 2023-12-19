import argon2 from "argon2";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import { throwResolverError } from "../utils/commonFunctions";
import { UserCreationInput, UserResponse, resolverError } from "./exports";

@Resolver()
export class memberResolver {
  @Query(() => [Member])
  users(): Promise<Member[]> {
    return Member.find({
  relations: ["channels", "messagesSent","messagesReceived"],
    });
  }

  @Mutation(() => Boolean)
  async clearUsers() {
    await AppDataSource.createQueryRunner().query(
      "TRUNCATE TABLE member CASCADE",
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async createUser(
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
}
export { resolverError };
