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
exports.DirectMessage = void 0;
const typeorm_1 = require("typeorm");
const Content_1 = require("./Content");
const Member_1 = require("./Member");
const Channel_1 = require("./Channel");
const type_graphql_1 = require("type-graphql");
let DirectMessage = class DirectMessage extends Content_1.Content {
};
exports.DirectMessage = DirectMessage;
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DirectMessage.prototype, "TextMessage", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DirectMessage.prototype, "channelID", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DirectMessage.prototype, "senderId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DirectMessage.prototype, "receiverID", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Channel_1.Channel),
    (0, typeorm_1.Column)(() => Channel_1.Channel),
    __metadata("design:type", Channel_1.Channel)
], DirectMessage.prototype, "channel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], DirectMessage.prototype, "receiverSeen", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], DirectMessage.prototype, "senderExists", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], DirectMessage.prototype, "senderExistsInChannel", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member),
    (0, typeorm_1.ManyToOne)(() => Member_1.Member, (member) => member.messagesSent),
    (0, typeorm_1.JoinColumn)({ name: "senderId" }),
    __metadata("design:type", Member_1.Member)
], DirectMessage.prototype, "sender", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member),
    (0, typeorm_1.ManyToOne)(() => Member_1.Member, (member) => member.messagesReceived),
    (0, typeorm_1.JoinColumn)({ name: "receiverID" }),
    __metadata("design:type", Member_1.Member)
], DirectMessage.prototype, "receiver", void 0);
exports.DirectMessage = DirectMessage = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], DirectMessage);
//# sourceMappingURL=DirectMessage.js.map