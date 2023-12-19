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
exports.MessageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const DirectMessage_1 = require("../entity/DirectMessage");
const exports_1 = require("./exports");
const commonFunctions_1 = require("../utils/commonFunctions");
let MessageResolver = class MessageResolver {
    async getAllMessages(channelId, userId) {
        return await DirectMessage_1.DirectMessage.find({
            where: {
                channelID: channelId,
                memberId: userId
            }
        });
    }
    async createMessage(channelId, receiverId, senderId, messageText) {
        try {
            const message = await DirectMessage_1.DirectMessage.create({
                channelID: channelId,
                memberId: senderId,
                receiverID: receiverId,
                Message: messageText
            });
            console.log(message);
            return message;
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
        }
    }
    async updateMessage(messageId, messageText) {
        try {
            const message = await DirectMessage_1.DirectMessage.findOne({
                where: {
                    _id: messageId,
                }
            });
            if (!message) {
                (0, commonFunctions_1.throwNotFoundError)("message");
                return;
            }
            message.Message = messageText;
            await message.save();
            return message;
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
        }
    }
    async deleteMessage(channelId, receiverId, senderId) {
        try {
            const message = await DirectMessage_1.DirectMessage.findOne({
                where: {
                    channelID: channelId,
                    memberId: senderId,
                    receiverID: receiverId,
                }
            });
            if (!message) {
                (0, commonFunctions_1.throwNotFoundError)("message");
                return;
            }
            await DirectMessage_1.DirectMessage.delete({
                channelID: channelId,
                memberId: senderId,
                receiverID: receiverId,
            });
            return true;
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
        }
    }
};
exports.MessageResolver = MessageResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [DirectMessage_1.DirectMessage]),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getAllMessages", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => DirectMessage_1.DirectMessage || exports_1.resolverError),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("receiverId", () => String)),
    __param(2, (0, type_graphql_1.Arg)("senderId", () => String)),
    __param(3, (0, type_graphql_1.Arg)("message", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => DirectMessage_1.DirectMessage || exports_1.resolverError),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("message", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "updateMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean || exports_1.resolverError),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("receiverId", () => String)),
    __param(2, (0, type_graphql_1.Arg)("senderId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
exports.MessageResolver = MessageResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MessageResolver);
//# sourceMappingURL=messages.js.map