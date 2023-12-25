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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const exports_1 = require("./exports");
let CommentResolver = class CommentResolver {
    async getAllPostComments() {
    }
    async getAllReplies() {
    }
    async createCommentOnPost() {
    }
    async editComment() {
    }
    async createThread() {
    }
    async deleteThread() {
    }
    async deleteComment() {
    }
};
exports.CommentResolver = CommentResolver;
__decorate([
    (0, type_graphql_1.Query)(() => exports_1.commentStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getAllPostComments", null);
__decorate([
    (0, type_graphql_1.Query)(() => exports_1.commentStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "getAllReplies", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.commentStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createCommentOnPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.commentStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "editComment", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.commentStatus),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "createThread", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean || exports_1.resolverError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "deleteThread", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean || exports_1.resolverError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "deleteComment", null);
exports.CommentResolver = CommentResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CommentResolver);
//# sourceMappingURL=comments.js.map