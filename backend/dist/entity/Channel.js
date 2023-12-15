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
exports.Channel = void 0;
const typeorm_1 = require("typeorm");
const Content_1 = require("./Content");
const Member_1 = require("./Member");
const DirectMessage_1 = require("./DirectMessage");
const Post_1 = require("./Post");
const type_graphql_1 = require("type-graphql");
let Channel = class Channel extends Content_1.Content {
};
exports.Channel = Channel;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel.prototype, "Name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Channel.prototype, "Description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Member_1.Member], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => Member_1.Member, (member) => member.channels, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Channel.prototype, "members", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [DirectMessage_1.DirectMessage], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => DirectMessage_1.DirectMessage, (message) => message.channel, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Channel.prototype, "messages", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Post_1.Post], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => Post_1.Post, (post) => post.channel, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Channel.prototype, "posts", void 0);
exports.Channel = Channel = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Channel);
//# sourceMappingURL=Channel.js.map