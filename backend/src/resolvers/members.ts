import argon2 from "argon2";
import { myContext } from "src/utils/myContext";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import {
  throwResolverError,
  validatePassword,
  validateUserCreationInput,
} from "../utils/commonFunctions";
import { UserCreationInput, UserResponse } from "./exports";

@Resolver()
export class memberResolver {
  @Query(() => [Member])
  users(): Promise<Member[]> {
    return Member.find({
      relations: ["channels", "messagesSent", "messagesReceived"],
    });
  }

  @Mutation(() => Boolean)
  async clearUsers() {
    await AppDataSource.createQueryRunner().query(
      "TRUNCATE TABLE member CASCADE",
    );
    return true;
  }
  @Query(() => Member, { nullable: true })
  async Me(@Ctx() ctx: myContext) {
    if (!ctx.req.session.user) {
      return null;
    }
    try {
      const user = await Member.findOne({
        where: {
          _id: ctx.req.session.user,
        },
        relations: ["channels", "messagesSent", "messagesReceived"],
      });
      return user;
    } catch (e) {
      console.error(e);
    }
  }
  @Mutation(() => UserResponse)
  async register(
    @Ctx() ctx: myContext,
    @Arg("data", () => UserCreationInput) data: UserCreationInput,
    @Arg("password", () => String) password: string,
  ) {
    console.log(password);
    const passError = validatePassword(password);
    if (passError) {
      return { errors: [passError] };
    }

    const errors = validateUserCreationInput(data);
    if (errors) {
      return { errors: [errors] };
    }
    const hashedPassword = await argon2.hash(password);
    const user = await Member.create({ ...data, password: hashedPassword });

    try {
      await user.save();
      ctx.req.session.user = user._id;

      return { user };
    } catch (Error) {
      return { errors: [throwResolverError(Error)] };
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() ctx: myContext,
    @Arg("usernameOrEmail", () => String) usernameOrEmail: string,
    @Arg("password", () => String) password: string,
  ) {
    const user = await Member.findOne({
      where: usernameOrEmail.includes("@")
        ? {
            email: usernameOrEmail,
          }
        : {
            username: usernameOrEmail,
          },
    });
    if (!user) {
      return {
        errors: [
          throwResolverError({
            message: "No such user found",
            name: "User not found",
            code: "404",
            detail: "User is not found!! ",
          }),
        ],
      };
    }
    const validity = await argon2.verify(user.password, password);
    if (!validity) {
      return {
        errors: [
          {
            message: "password",
            name: "Incorrect Password",
            code: "422",
            detail: "Please Enter a correct password!!",
          },
        ],
      };
    }
    try {
      await user.save();
      ctx.req.session.user = user._id;
    } catch (Error) {
      return { errors: [throwResolverError(Error)] };
    }
    return { user };
  }
}
