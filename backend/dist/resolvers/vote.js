"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const exports_1 = require("./exports");
const Post_1 = require("../entity/Post");
const commonFunctions_1 = require("../utils/commonFunctions");
const Comment_1 = require("../entity/Comment");
const Member_1 = require("../entity/Member");
const Vote_1 = require("../entity/Vote");
let VoteResolver = class VoteResolver {
    async getPostVotes(postId) {
        try {
            const post = await Post_1.Post.findOne({
                where: {
                    _id: postId
                }
            });
            if (!post) {
                const notFoundError = (0, commonFunctions_1.throwNotFoundError)("post");
                return {
                    success: false,
                    error: [notFoundError]
                };
            }
            return {
                success: true,
                votes: post.votes
            };
        }
        catch (e) {
            const resolverError = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [resolverError]
            };
        }
    }
    async getCommentVotes(commentId) {
        try {
            const comment = await Comment_1.Comment.findOne({
                where: {
                    _id: commentId
                }
            });
            if (!comment) {
                const notFoundError = (0, commonFunctions_1.throwNotFoundError)("comment");
                return {
                    success: false,
                    error: [notFoundError]
                };
            }
            return {
                success: true,
                votes: comment.votes
            };
        }
        catch (e) {
            const resolverError = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [resolverError]
            };
        }
    }
    async getMyVotes(ctx) {
        try {
            const user = await Member_1.Member.findOne({
                where: {
                    _id: ctx.req.session.user
                }
            });
            if (!user) {
                const notFoundError = (0, commonFunctions_1.throwNotFoundError)("user");
                return {
                    success: false,
                    error: [notFoundError]
                };
            }
            return {
                success: true,
                votes: user.votes
            };
        }
        catch (e) {
            const resolverError = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [resolverError]
            };
        }
    }
    async votePost(postId, isUpvote, ctx) {
        try {
            const post = await Post_1.Post.findOne({
                where: {
                    _id: postId
                }
            });
            if (!post) {
                const notFoundError = (0, commonFunctions_1.throwNotFoundError)("post");
                return {
                    success: false,
                    error: [notFoundError]
                };
            }
            const vote = await Vote_1.Vote.findOne({
                where: {
                    postId: postId,
                    memberId: ctx.req.session.user
                },
                relations: ["member", "post"]
            });
            if (vote) {
                if (vote.value === 1 && isUpvote || vote.value === -1 && !isUpvote) {
                    await Vote_1.Vote.delete({
                        _id: vote._id
                    });
                    return {
                        success: true,
                        vote: vote
                    };
                }
                else {
                    if (vote.value === 1) {
                        vote.value = -1;
                    }
                    else {
                        vote.value = 1;
                    }
                    await vote.save();
                    return {
                        success: true,
                        vote: vote
                    };
                }
            }
            else {
                const value = isUpvote ? 1 : -1;
                const vote = await Vote_1.Vote.create({
                    value: value,
                    memberId: ctx.req.session.user,
                    postId: postId
                });
                await vote.save();
                return {
                    success: true,
                    vote: vote
                };
            }
        }
        catch (e) {
            const resolverError = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [resolverError]
            };
        }
    }
    async voteComment(commentId, isUpvote, ctx) {
        try {
            const comment = await Post_1.Post.findOne({
                where: {
                    _id: commentId
                }
            });
            if (!comment) {
                const notFoundError = (0, commonFunctions_1.throwNotFoundError)("post");
                return {
                    success: false,
                    error: [notFoundError]
                };
            }
            const vote = await Vote_1.Vote.findOne({
                where: {
                    commentId: commentId,
                    memberId: ctx.req.session.user
                },
                relations: ["member", "comment"]
            });
            if (vote) {
                if (vote.value === 1 && isUpvote || vote.value === -1 && !isUpvote) {
                    await Vote_1.Vote.delete({
                        _id: vote._id
                    });
                    return {
                        success: true,
                        vote: vote
                    };
                }
                else {
                    if (vote.value === 1) {
                        vote.value = -1;
                    }
                    else {
                        vote.value = 1;
                    }
                    await vote.save();
                    return {
                        success: true,
                        vote: vote
                    };
                }
            }
            else {
                const value = isUpvote ? 1 : -1;
                const vote = await Vote_1.Vote.create({
                    value: value,
                    memberId: ctx.req.session.user,
                    commentId: commentId
                });
                await vote.save();
                return {
                    success: true,
                    vote: vote
                };
            }
        }
        catch (e) {
            const resolverError = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [resolverError]
            };
        }
    }
};
exports.VoteResolver = VoteResolver;
__decorate([
    (0, type_graphql_1.Query)(() => exports_1.voteStatus),
    __param(0, (0, type_graphql_1.Arg)("postId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoteResolver.prototype, "getPostVotes", null);
__decorate([
    (0, type_graphql_1.Query)(() => exports_1.voteStatus),
    __param(0, (0, type_graphql_1.Arg)("commentId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VoteResolver.prototype, "getCommentVotes", null);
__decorate([
    (0, type_graphql_1.Query)(() => exports_1.voteStatus),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VoteResolver.prototype, "getMyVotes", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.voteStatus),
    __param(0, (0, type_graphql_1.Arg)("postId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("isUpvote", () => Boolean)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], VoteResolver.prototype, "votePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.voteStatus),
    __param(0, (0, type_graphql_1.Arg)("commentId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("isUpvote", () => Boolean)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, Object]),
    __metadata("design:returntype", Promise)
], VoteResolver.prototype, "voteComment", null);
exports.VoteResolver = VoteResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], VoteResolver);
//# sourceMappingURL=vote.js.map