import { Mutation, Query, Resolver } from "type-graphql";
import { voteStatus } from "./exports";

@Resolver()
export class VoteResolver {
  @Query(() => voteStatus)
  async getPostVotes() {}
  @Query(() => voteStatus)
  async getCommentVotes() {}
  @Query(() => voteStatus)
  async getMyVotes() {}

  @Mutation(() => voteStatus)
  async votePost() {}
  @Mutation(() => voteStatus)
  async voteComment() {}
}
