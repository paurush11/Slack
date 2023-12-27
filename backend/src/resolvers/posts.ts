import { Member } from "../entity/Member";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Channel } from "../entity/Channel";
import { Post } from "../entity/Post";
import {
  throwNotFoundError,
  throwResolverError,
} from "../utils/commonFunctions";
import { myContext } from "../utils/myContext";
import { postStatus, resolverError } from "./exports";

@Resolver()
export class PostResolver {
  @Query(() => postStatus)
  async getMyPost(
    @Arg("channelId", () => String) channelId: string,
    @Arg("postId", () => String) postId: string,
  ) {
    try {
      const post = await Post.findOne({
        where: {
          _id: postId,
          channelID: channelId,
        },
        relations: ["comments", "votes", "creator", "channel"],
      });

      if (!post) {
        const errorMsg = throwNotFoundError("post");
        return {
          success: false,
          error: [errorMsg],
        } as postStatus;
      } else {
        return {
          success: true,
          post: post,
        } as postStatus;
      }
    } catch (e) {
      const error = throwResolverError(e);
      return {
        success: false,
        resolverError: [error],
      } as postStatus;
    }
  }

  @Query(() => postStatus)
  async getAllMyPosts(
    @Arg("channelId", () => String) channelId: string,
    @Ctx() ctx: myContext,
  ) {
    try {
      const user = await Member.findOne({
        where: {
          _id: ctx.req.session.user,
        },
      });

      if (!user) {
        const errorMsg = throwNotFoundError("user");
        return {
          success: false,
          error: [errorMsg],
        } as postStatus;
      }

      const posts = await Post.find({
        where: {
          channelID: channelId,
          memberId: ctx.req.session.user,
        },
        relations: ["comments", "creator", "channel", "votes"],
      });

      return {
        success: true,
        posts: posts,
      } as postStatus;
    } catch (e) {
      const error = throwResolverError(e);
      return {
        success: false,
        resolverError: [error],
      } as postStatus;
    }
  }

  @Mutation(() => postStatus)
  async createPost(
    @Arg("channelId", () => String) channelId: string,
    @Ctx() ctx: myContext,
    @Arg("title", () => String) title: string,
    @Arg("description", () => String) description: string,
  ) {
    try {
      const channel = Channel.findOne({
        where: {
          _id: channelId,
        },
      });
      const user = Member.findOne({
        where: {
          _id: ctx.req.session.user,
        },
      });
      if (!channel) {
        const errorMsg = throwNotFoundError("channel");
        return {
          success: false,
          error: [errorMsg],
        } as postStatus;
      }
      if (!user) {
        const errorMsg = throwNotFoundError("user");
        return {
          success: false,
          error: [errorMsg],
        } as postStatus;
      }
      const post = await Post.create({
        title: title,
        description: description,
        channelID: channelId,
        memberId: ctx.req.session.user,
      });

      await post.save();
      return {
        success: true,
        post: post,
      } as postStatus;
    } catch (e) {
      const error = throwResolverError(e);
      return {
        success: false,
        resolverError: [error],
      } as postStatus;
    }
  }

  @Mutation(() => postStatus)
  async updatePost(
    @Arg("postId", () => String) postId: string,
    @Ctx() ctx: myContext,
    @Arg("title", () => String) title: string,
    @Arg("description", () => String) description: string,
  ) {
    try {
      const user = Member.findOne({
        where: {
          _id: ctx.req.session.user,
        },
      });
      if (!user) {
        const errorMsg = throwNotFoundError("user");
        return {
          success: false,
          error: [
            {
              message: errorMsg.message,
              item: errorMsg.item,
            },
          ],
        } as postStatus;
      }
      const post = await Post.findOne({
        where: {
          _id: postId,
          memberId: ctx.req.session.user,
        },
      });

      if (!post) {
        const errorMsg = throwNotFoundError("post");
        return {
          success: false,
          error: [
            {
              message: errorMsg.message,
              item: errorMsg.item,
            },
          ],
        } as postStatus;
      }
      post.title = title;
      post.description = description;

      await post.save();
      return {
        success: true,
        post: post,
      } as postStatus;
    } catch (e) {
      const error = throwResolverError(e);
      return {
        success: false,
        resolverError: [
          {
            message: error.message,
            code: error.code,
            detail: error.detail,
            name: error.name,
          },
        ],
      } as postStatus;
    }
  }

  @Mutation(() => postStatus)
  async deletePost(
    @Arg("postId", () => String) postId: string,
    @Ctx() ctx: myContext,
  ) {
    try {
      const post = await Post.findOne({
        where: {
          _id: postId,
        },
      });
      const user = Member.findOne({
        where: {
          _id: ctx.req.session.user,
        },
      });
      if (!post) {
        const errorMsg = throwNotFoundError("channel");
        return {
          success: false,
          error: [errorMsg],
        } as postStatus;
      }
      if (!user) {
        const errorMsg = throwNotFoundError("user");
        return {
          success: false,
          error: [errorMsg],
        } as postStatus;
      }
      if (post.memberId === ctx.req.session.user) {
        await Post.delete({
          _id: postId,
        });
        return {
          success: true,
        } as postStatus;
      } else {
        const errorMsg = throwNotFoundError("creator");
        return {
          success: false,
          error: [errorMsg],
        } as postStatus;
      }
    } catch (e) {
      const errorMsg = throwResolverError(e);
      return {
        success: false,
        resolverError: [errorMsg],
      } as postStatus;
    }
  }
}
