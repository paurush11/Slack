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
exports.voteStatus = exports.userStatus = exports.postStatus = exports.ChannelResponse = exports.messageStatus = exports.UserCreationInput = exports.resolverError = exports.UserResponse = exports.MESSAGE_SEEN_TOPIC = exports.MESSAGE_DELETED_TOPIC = exports.MESSAGE_UPDATED_TOPIC = exports.MESSAGE_ADDED_TOPIC = void 0;
const Post_1 = require("../entity/Post");
const Channel_1 = require("../entity/Channel");
const DirectMessage_1 = require("../entity/DirectMessage");
const Member_1 = require("../entity/Member");
const type_graphql_1 = require("type-graphql");
const Comment_1 = require("../entity/Comment");
let UserCreationInput = class UserCreationInput {
};
exports.UserCreationInput = UserCreationInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreationInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreationInput.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreationInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreationInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserCreationInput.prototype, "phoneNumber", void 0);
exports.UserCreationInput = UserCreationInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserCreationInput);
let resolverError = class resolverError {
};
exports.resolverError = resolverError;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], resolverError.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], resolverError.prototype, "code", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], resolverError.prototype, "detail", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], resolverError.prototype, "name", void 0);
exports.resolverError = resolverError = __decorate([
    (0, type_graphql_1.ObjectType)()
], resolverError);
let notFoundErrorType = class notFoundErrorType {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], notFoundErrorType.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], notFoundErrorType.prototype, "item", void 0);
notFoundErrorType = __decorate([
    (0, type_graphql_1.ObjectType)()
], notFoundErrorType);
let ChannelResponse = class ChannelResponse {
};
exports.ChannelResponse = ChannelResponse;
__decorate([
    (0, type_graphql_1.Field)(() => Channel_1.Channel, { nullable: true }),
    __metadata("design:type", Channel_1.Channel)
], ChannelResponse.prototype, "channel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [notFoundErrorType], { nullable: true }),
    __metadata("design:type", Array)
], ChannelResponse.prototype, "errors", void 0);
exports.ChannelResponse = ChannelResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ChannelResponse);
let postStatus = class postStatus {
};
exports.postStatus = postStatus;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], postStatus.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Post_1.Post, { nullable: true }),
    __metadata("design:type", Post_1.Post)
], postStatus.prototype, "post", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Post_1.Post], { nullable: true }),
    __metadata("design:type", Array)
], postStatus.prototype, "posts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [notFoundErrorType], { nullable: true }),
    __metadata("design:type", Array)
], postStatus.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [resolverError], { nullable: true }),
    __metadata("design:type", Array)
], postStatus.prototype, "resolverError", void 0);
exports.postStatus = postStatus = __decorate([
    (0, type_graphql_1.ObjectType)()
], postStatus);
let userStatus = class userStatus {
};
exports.userStatus = userStatus;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], userStatus.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member, { nullable: true }),
    __metadata("design:type", Member_1.Member)
], userStatus.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [notFoundErrorType], { nullable: true }),
    __metadata("design:type", Array)
], userStatus.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [resolverError], { nullable: true }),
    __metadata("design:type", Array)
], userStatus.prototype, "resolverError", void 0);
exports.userStatus = userStatus = __decorate([
    (0, type_graphql_1.ObjectType)()
], userStatus);
let voteStatus = class voteStatus {
};
exports.voteStatus = voteStatus;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], voteStatus.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member, { nullable: true }),
    __metadata("design:type", Member_1.Member)
], voteStatus.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Post_1.Post], { nullable: true }),
    __metadata("design:type", Array)
], voteStatus.prototype, "posts", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Comment_1.Comment], { nullable: true }),
    __metadata("design:type", Array)
], voteStatus.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [notFoundErrorType], { nullable: true }),
    __metadata("design:type", Array)
], voteStatus.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [resolverError], { nullable: true }),
    __metadata("design:type", Array)
], voteStatus.prototype, "resolverError", void 0);
exports.voteStatus = voteStatus = __decorate([
    (0, type_graphql_1.ObjectType)()
], voteStatus);
let messageStatus = class messageStatus {
};
exports.messageStatus = messageStatus;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], messageStatus.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => DirectMessage_1.DirectMessage, { nullable: true }),
    __metadata("design:type", DirectMessage_1.DirectMessage)
], messageStatus.prototype, "data", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [notFoundErrorType], { nullable: true }),
    __metadata("design:type", Array)
], messageStatus.prototype, "error", void 0);
exports.messageStatus = messageStatus = __decorate([
    (0, type_graphql_1.ObjectType)()
], messageStatus);
let UserResponse = class UserResponse {
};
exports.UserResponse = UserResponse;
__decorate([
    (0, type_graphql_1.Field)(() => [resolverError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member, { nullable: true }),
    __metadata("design:type", Member_1.Member)
], UserResponse.prototype, "user", void 0);
exports.UserResponse = UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
const MESSAGE_ADDED_TOPIC = "MESSAGE_ADDED";
exports.MESSAGE_ADDED_TOPIC = MESSAGE_ADDED_TOPIC;
const MESSAGE_UPDATED_TOPIC = "MESSAGE_UPDATED";
exports.MESSAGE_UPDATED_TOPIC = MESSAGE_UPDATED_TOPIC;
const MESSAGE_DELETED_TOPIC = "MESSAGE_DELETED";
exports.MESSAGE_DELETED_TOPIC = MESSAGE_DELETED_TOPIC;
const MESSAGE_SEEN_TOPIC = "MESSAGE_SEEN";
exports.MESSAGE_SEEN_TOPIC = MESSAGE_SEEN_TOPIC;
//# sourceMappingURL=exports.js.map