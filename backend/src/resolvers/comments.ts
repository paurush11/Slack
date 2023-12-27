import { Mutation, Query, Resolver } from "type-graphql";
import { commentStatus, resolverError } from "./exports";

@Resolver()
export class CommentResolver {
  @Query(() => commentStatus)
  async getAllPostComments() {}
  @Query(() => commentStatus)
  async getAllReplies() {}
  @Mutation(() => commentStatus)
  async createCommentOnPost() {}
  @Mutation(() => commentStatus)
  async editComment() {}

  @Mutation(() => commentStatus)
  async createThread() {}

  @Mutation(() => Boolean || resolverError)
  async deleteThread() {}
  @Mutation(() => Boolean || resolverError)
  async deleteComment() {}
}
