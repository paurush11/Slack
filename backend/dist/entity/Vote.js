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
exports.Vote = void 0;
const typeorm_1 = require("typeorm");
const Content_1 = require("./Content");
const Member_1 = require("./Member");
const Post_1 = require("./Post");
const Comment_1 = require("./Comment");
const type_graphql_1 = require("type-graphql");
let Vote = class Vote extends Content_1.Content {
};
exports.Vote = Vote;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Vote.prototype, "value", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vote.prototype, "memberId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vote.prototype, "commentId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vote.prototype, "postId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member),
    (0, typeorm_1.ManyToOne)(() => Member_1.Member, (member) => member.votes),
    (0, typeorm_1.JoinColumn)({ name: "memberId" }),
    __metadata("design:type", Member_1.Member)
], Vote.prototype, "member", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Post_1.Post, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Post_1.Post, (post) => post.votes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "postId" }),
    __metadata("design:type", Post_1.Post)
], Vote.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Comment_1.Comment, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Comment_1.Comment, (comment) => comment.votes, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "commentId" }),
    __metadata("design:type", Comment_1.Comment)
], Vote.prototype, "comment", void 0);
exports.Vote = Vote = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Vote);
//# sourceMappingURL=Vote.js.map