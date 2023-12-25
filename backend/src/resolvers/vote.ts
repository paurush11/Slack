import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { voteStatus } from "./exports";
import { Post } from "../entity/Post";
import { throwNotFoundError, throwResolverError } from "../utils/commonFunctions";
import { Comment } from "../entity/Comment";
import { myContext } from "../utils/myContext";
import { Member } from "../entity/Member";
import { Vote } from "../entity/Vote";

@Resolver()
export class VoteResolver {
  @Query(() => voteStatus)
  async getPostVotes(
    @Arg("postId", () => String) postId: string
  ) {

    try {
      const post = await Post.findOne({
        where: {
          _id: postId
        }
      })

      if (!post) {
        const notFoundError = throwNotFoundError("post")
        return {
          success: false,
          error: [notFoundError]
        } as voteStatus
      }

      return {
        success: true,
        votes: post.votes
      } as voteStatus

    } catch (e) {
      const resolverError = throwResolverError(e);
      return {
        success: false,
        resolverError: [resolverError]
      } as voteStatus
    }
  }
  @Query(() => voteStatus)
  async getCommentVotes(
    @Arg("commentId", () => String) commentId: string
  ) {
    try {
      const comment = await Comment.findOne({
        where: {
          _id: commentId
        }
      })

      if (!comment) {
        const notFoundError = throwNotFoundError("comment")
        return {
          success: false,
          error: [notFoundError]
        } as voteStatus
      }

      return {
        success: true,
        votes: comment.votes
      } as voteStatus

    } catch (e) {
      const resolverError = throwResolverError(e);
      return {
        success: false,
        resolverError: [resolverError]
      } as voteStatus
    }
  }
  @Query(() => voteStatus)
  async getMyVotes(
    @Ctx() ctx: myContext
  ) {
    try {
      const user = await Member.findOne({
        where: {
          _id: ctx.req.session.user
        }
      })

      if (!user) {
        const notFoundError = throwNotFoundError("user")
        return {
          success: false,
          error: [notFoundError]
        } as voteStatus
      }

      return {
        success: true,
        votes: user.votes
      } as voteStatus

    } catch (e) {
      const resolverError = throwResolverError(e);
      return {
        success: false,
        resolverError: [resolverError]
      } as voteStatus
    }
  }
  @Mutation(() => voteStatus)
  async votePost(
    @Arg("postId", () => String) postId: string,
    @Arg("isUpvote", () => Boolean) isUpvote: boolean,
    @Ctx() ctx: myContext
  ) {
    try {
      const post = await Post.findOne({
        where: {
          _id: postId
        }
      })
      if (!post) {
        const notFoundError = throwNotFoundError("post")
        return {
          success: false,
          error: [notFoundError]
        } as voteStatus
      }

      const vote = await Vote.findOne({
        where: {
          postId: postId,
          memberId: ctx.req.session.user
        },

        relations: ["member", "post"]
      })

      if (vote) {
        if (vote.value === 1 && isUpvote || vote.value === -1 && !isUpvote) {
          await Vote.delete({
            _id: vote._id
          })

          return {
            success: true,
            vote: vote
          } as voteStatus
        } else {

          if (vote.value === 1) {
            vote.value = -1
          } else {
            vote.value = 1
          }
          await vote.save();
          return {
            success: true,
            vote: vote
          } as voteStatus

        }
      } else {
        const value = isUpvote ? 1 : -1;
        const vote = await Vote.create({
          value: value,
          memberId: ctx.req.session.user,
          postId: postId
        })

        await vote.save();
        return {
          success: true,
          vote: vote
        } as voteStatus
      }
    } catch (e) {
      const resolverError = throwResolverError(e);
      return {
        success: false,
        resolverError: [resolverError]
      } as voteStatus
    }
  }
  @Mutation(() => voteStatus)
  async voteComment(
    @Arg("commentId", () => String) commentId: string,
    @Arg("isUpvote", () => Boolean) isUpvote: boolean,
    @Ctx() ctx: myContext
  ) {
    try {
      const comment = await Post.findOne({
        where: {
          _id: commentId
        }
      })
      if (!comment) {
        const notFoundError = throwNotFoundError("post")
        return {
          success: false,
          error: [notFoundError]
        } as voteStatus
      }

      const vote = await Vote.findOne({
        where: {
          commentId: commentId,
          memberId: ctx.req.session.user
        },

        relations: ["member", "comment"]
      })

      if (vote) {
        if (vote.value === 1 && isUpvote || vote.value === -1 && !isUpvote) {
          await Vote.delete({
            _id: vote._id
          })

          return {
            success: true,
            vote: vote
          } as voteStatus
        } else {

          if (vote.value === 1) {
            vote.value = -1
          } else {
            vote.value = 1
          }
          await vote.save();
          return {
            success: true,
            vote: vote
          } as voteStatus

        }
      } else {
        const value = isUpvote ? 1 : -1;
        const vote = await Vote.create({
          value: value,
          memberId: ctx.req.session.user,
          commentId: commentId
        })

        await vote.save();
        return {
          success: true,
          vote: vote
        } as voteStatus
      }
    } catch (e) {
      const resolverError = throwResolverError(e);
      return {
        success: false,
        resolverError: [resolverError]
      } as voteStatus
    }
  }
  @Mutation(() => voteStatus)
  async deleteVote(
    @Arg("voteId", () => String) voteId: string,
    @Ctx() ctx: myContext
  ) {
    try {
      const vote = await Vote.findOne({
        where: {
          _id: voteId
        },

        relations: ["member", "comment", "post"]
      })

      if (!vote) {
        const notFoundError = throwNotFoundError("vote")
        return {
          success: false,
          error: [notFoundError]
        } as voteStatus
      }
      if (vote._id === ctx.req.session.user) {
        await Vote.delete({
          _id: vote._id
        })
      } else {
        const notFoundError = throwNotFoundError("user/creator")
        return {
          success: false,
          error: [notFoundError]
        } as voteStatus
      }

    } catch (e) {
      const resolverError = throwResolverError(e);
      return {
        success: false,
        resolverError: [resolverError]
      } as voteStatus
    }
  }


}
