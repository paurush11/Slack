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
exports.PostResolver = void 0;
const Member_1 = require("../entity/Member");
const type_graphql_1 = require("type-graphql");
const Channel_1 = require("../entity/Channel");
const Post_1 = require("../entity/Post");
const commonFunctions_1 = require("../utils/commonFunctions");
const exports_1 = require("./exports");
let PostResolver = class PostResolver {
    async getMyPost(channelId, postId) {
        try {
            const post = await Post_1.Post.findOne({
                where: {
                    _id: postId,
                    channelID: channelId,
                },
                relations: ["comments", "votes", "creator", "channel"],
            });
            if (!post) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("post");
                return {
                    success: false,
                    error: [errorMsg],
                };
            }
            else {
                return {
                    success: true,
                    post: post,
                };
            }
        }
        catch (e) {
            const error = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [error],
            };
        }
    }
    async getAllMyPosts(channelId, ctx) {
        try {
            const user = await Member_1.Member.findOne({
                where: {
                    _id: ctx.req.session.user,
                },
            });
            if (!user) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("user");
                return {
                    success: false,
                    error: [errorMsg],
                };
            }
            const posts = await Post_1.Post.find({
                where: {
                    channelID: channelId,
                    memberId: ctx.req.session.user,
                },
                relations: ["comments", "creator", "channel", "votes"],
            });
            return {
                success: true,
                posts: posts,
            };
        }
        catch (e) {
            const error = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [error],
            };
        }
    }
    async createPost(channelId, ctx, title, description) {
        try {
            const channel = Channel_1.Channel.findOne({
                where: {
                    _id: channelId,
                },
            });
            const user = Member_1.Member.findOne({
                where: {
                    _id: ctx.req.session.user,
                },
            });
            if (!channel) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("channel");
                return {
                    success: false,
                    error: [errorMsg],
                };
            }
            if (!user) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("user");
                return {
                    success: false,
                    error: [errorMsg],
                };
            }
            const post = await Post_1.Post.create({
                title: title,
                description: description,
                channelID: channelId,
                memberId: ctx.req.session.user,
            });
            await post.save();
            return {
                success: true,
                post: post,
            };
        }
        catch (e) {
            const error = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [error],
            };
        }
    }
    async updatePost(postId, ctx, title, description) {
        try {
            const user = Member_1.Member.findOne({
                where: {
                    _id: ctx.req.session.user,
                },
            });
            if (!user) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("user");
                return {
                    success: false,
                    error: [
                        {
                            message: errorMsg.message,
                            item: errorMsg.item,
                        },
                    ],
                };
            }
            const post = await Post_1.Post.findOne({
                where: {
                    _id: postId,
                    memberId: ctx.req.session.user,
                },
            });
            if (!post) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("post");
                return {
                    success: false,
                    error: [
                        {
                            message: errorMsg.message,
                            item: errorMsg.item,
                        },
                    ],
                };
            }
            post.title = title;
            post.description = description;
            await post.save();
            return {
                success: true,
                post: post,
            };
        }
        catch (e) {
            const error = (0, commonFunctions_1.throwResolverError)(e);
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
            };
        }
    }
    async deletePost(postId, ctx) {
        try {
            const post = await Post_1.Post.findOne({
                where: {
                    _id: postId
                }
            });
            const user = Member_1.Member.findOne({
                where: {
                    _id: ctx.req.session.user,
                },
            });
            if (!post) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("channel");
                return {
                    success: false,
                    error: [errorMsg],
                };
            }
            if (!user) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("user");
                return {
                    success: false,
                    error: [errorMsg],
                };
            }
            if (post.memberId === ctx.req.session.user) {
                await Post_1.Post.delete({
                    _id: postId
                });
                return {
                    success: true,
                };
            }
            else {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("creator");
                return {
                    success: false,
                    error: [errorMsg],
                };
            }
        }
        catch (e) {
            const errorMsg = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [errorMsg],
            };
        }
    }
};
exports.PostResolver = PostResolver;
__decorate([
    (0, type_graphql_1.Query)(() => exports_1.postStatus),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("postId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getMyPost", null);
__decorate([
    (0, type_graphql_1.Query)(() => exports_1.postStatus),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getAllMyPosts", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.postStatus),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __param(2, (0, type_graphql_1.Arg)("title", () => String)),
    __param(3, (0, type_graphql_1.Arg)("description", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.postStatus),
    __param(0, (0, type_graphql_1.Arg)("postId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __param(2, (0, type_graphql_1.Arg)("title", () => String)),
    __param(3, (0, type_graphql_1.Arg)("description", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.postStatus),
    __param(0, (0, type_graphql_1.Arg)("postId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
exports.PostResolver = PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
//# sourceMappingURL=posts.js.map