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
exports.Member = void 0;
const typeorm_1 = require("typeorm");
const Content_1 = require("./Content");
const Channel_1 = require("./Channel");
const DirectMessage_1 = require("./DirectMessage");
const Post_1 = require("./Post");
const Comment_1 = require("./Comment");
const Vote_1 = require("./Vote");
const type_graphql_1 = require("type-graphql");
let Member = class Member extends Content_1.Content {
};
exports.Member = Member;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Member.prototype, "isActive", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Member.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Member.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Channel_1.Channel]),
    (0, typeorm_1.ManyToMany)(() => Channel_1.Channel, (channel) => channel.members),
    __metadata("design:type", Array)
], Member.prototype, "channels", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [DirectMessage_1.DirectMessage], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => DirectMessage_1.DirectMessage, (message) => message.sender),
    __metadata("design:type", Array)
], Member.prototype, "messages", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Post_1.Post], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Post_1.Post, (post) => post.creator),
    __metadata("design:type", Array)
], Member.prototype, "posts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Comment_1.Comment], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (post) => post.creator),
    __metadata("design:type", Array)
], Member.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Vote_1.Vote], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Vote_1.Vote, (vote) => vote.member),
    __metadata("design:type", Array)
], Member.prototype, "votes", void 0);
exports.Member = Member = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Member);
//# sourceMappingURL=Member.js.map