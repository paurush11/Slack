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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const Content_1 = require("./Content");
const Post_1 = require("./Post");
const Member_1 = require("./Member");
const Vote_1 = require("./Vote");
const type_graphql_1 = require("type-graphql");
let Comment = class Comment extends Content_1.Content {
};
exports.Comment = Comment;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Post_1.Post),
    (0, typeorm_1.ManyToOne)(() => Post_1.Post, (post) => post.comments),
    (0, typeorm_1.JoinColumn)({ name: "postId" }),
    __metadata("design:type", Post_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "memberId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "postId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "replyId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member),
    (0, typeorm_1.ManyToOne)(() => Member_1.Member, (member) => member.comments),
    (0, typeorm_1.JoinColumn)({ name: "memberId" }),
    __metadata("design:type", Member_1.Member)
], Comment.prototype, "creator", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Vote_1.Vote], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Vote_1.Vote, (vote) => vote.comment, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Comment.prototype, "votes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Comment, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Comment, (comment) => comment.replies),
    (0, typeorm_1.JoinColumn)({ name: "replyId" }),
    __metadata("design:type", Comment)
], Comment.prototype, "parentComment", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Comment], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Comment, (comment) => comment.parentComment),
    __metadata("design:type", Array)
], Comment.prototype, "replies", void 0);
exports.Comment = Comment = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Comment);
//# sourceMappingURL=Comment.js.map