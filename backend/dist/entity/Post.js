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
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const Content_1 = require("./Content");
const Comment_1 = require("./Comment");
const Member_1 = require("./Member");
const Channel_1 = require("./Channel");
const Vote_1 = require("./Vote");
const type_graphql_1 = require("type-graphql");
let Post = class Post extends Content_1.Content {
};
exports.Post = Post;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Comment_1.Comment], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comment) => comment.post, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member),
    (0, typeorm_1.ManyToOne)(() => Member_1.Member, (member) => member.posts),
    __metadata("design:type", Member_1.Member)
], Post.prototype, "creator", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Channel_1.Channel),
    (0, typeorm_1.ManyToOne)(() => Channel_1.Channel, (channel) => channel.posts),
    __metadata("design:type", Channel_1.Channel)
], Post.prototype, "channel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Vote_1.Vote], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Vote_1.Vote, (vote) => vote.post, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Post.prototype, "votes", void 0);
exports.Post = Post = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Post);
//# sourceMappingURL=Post.js.map