import argon2 from "argon2";
import { myContext } from "../utils/myContext";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AppDataSource } from "../data-source";
import { Member } from "../entity/Member";
import {
  throwNotFoundError,
  throwResolverError,
  validatePassword,
  validateUserCreationInput,
} from "../utils/commonFunctions";
import { UserCreationInput, UserResponse, userStatus } from "./exports";

@Resolver()
export class memberResolver {
  @Query(() => [Member])
  users(): Promise<Member[]> {
    return Member.find({
      relations: [
        "channels",
        "messagesSent",
        "messagesReceived",
        "votes",
        "posts",
        "comments",
      ],
    });
  }
  @Query(() => userStatus, { nullable: true })
  async Me(@Ctx() ctx: myContext) {
    console.log("Home here");
    console.log(ctx.req.session.user);
    if (!ctx.req.session.user) {
      return null;
    }
    try {
      const user = await Member.findOne({
        where: {
          _id: ctx.req.session.user,
        },
        relations: [
          "channels",
          "messagesSent",
          "messagesReceived",
          "votes",
          "posts",
          "comments",
        ],
      });
      if (!user) {
        const notFoundError = throwNotFoundError("user");
        return {
          success: true,
          error: [notFoundError],
        } as userStatus;
      }
      return {
        success: true,
        user: user,
      } as userStatus;
    } catch (e) {
      const resolverError = throwResolverError(e);
      return {
        success: false,
        resolverError: [resolverError],
      } as userStatus;
    }
  }
  @Mutation(() => Boolean)
  async clearUsers() {
    await AppDataSource.createQueryRunner().query(
      "TRUNCATE TABLE member CASCADE",
    );
    return true;
  }
  @Mutation(() => UserResponse)
  async Register(
    @Ctx() ctx: myContext,
    @Arg("UserCreationInput", () => UserCreationInput) data: UserCreationInput,
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
  async Login(
    @Ctx() ctx: myContext,
    @Arg("usernameOrEmail", () => String) usernameOrEmail: string,
    @Arg("password", () => String) password: string,
  ) {
    console.log("In Login");
    console.log(usernameOrEmail);
    const user = await Member.findOne({
      where: usernameOrEmail.includes("@")
        ? {
          email: usernameOrEmail,
        }
        : {
          username: usernameOrEmail,
        },
      relations: [
        "channels",
        "messagesSent",
        "messagesReceived",
        "votes",
        "posts",
        "comments",
      ],
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
      console.log("here");
      await user.save();
      ctx.req.session.user = user._id;
      console.log(process.env.COOKIE_NAME);

      return { user };
    } catch (Error) {
      return { errors: [throwResolverError(Error)] };
    }
  }
  @Mutation(() => Boolean)
  async Logout(@Ctx() ctx: myContext) {
    return new Promise((resolve) => {
      ctx.req.session.destroy((err) => {
        ctx.res.clearCookie(process.env.COOKIE_NAME as string);
        if (err) {
          console.log(err);
          resolve(err);
          return false;
        }
        resolve(true);
        return true;
      });
    });
  }
}
