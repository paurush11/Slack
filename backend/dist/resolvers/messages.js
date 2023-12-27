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
const Member_1 = require("../entity/Member");
const Channel_1 = require("../entity/Channel");
let MessageResolver = class MessageResolver {
    async newMessage(messagePayload, channelId) {
        console.log('Subscription payload received:', messagePayload);
        return messagePayload;
    }
    async messageUpdated(updatePayload, channelId) {
        return updatePayload;
    }
    async messageDeleted(deletePayload, channelId) {
        return deletePayload;
    }
    async messageSeen(deletePayload, channelId) {
        return deletePayload;
    }
    async getAll() {
        const messages = await DirectMessage_1.DirectMessage.find({
            relations: ["sender", "receiver"],
        });
        console.log(messages);
        return messages;
    }
    async getAllReceivedMessages(channelId, userId) {
        return await DirectMessage_1.DirectMessage.find({
            where: {
                channelID: channelId,
                receiverID: userId,
            },
            relations: ["sender", "receiver"],
        });
    }
    async getAllSentMessages(channelId, userId) {
        return await DirectMessage_1.DirectMessage.find({
            where: {
                channelID: channelId,
                senderId: userId,
            },
            relations: ["sender", "receiver"],
        });
    }
    async getMyMessagesInChannel(channelId, ctx) {
        const sentMessages = await DirectMessage_1.DirectMessage.find({
            where: {
                channelID: channelId,
                senderId: ctx.req.session.user,
            },
            relations: ["sender", "receiver"],
        });
        const recievedMessages = await DirectMessage_1.DirectMessage.find({
            where: {
                channelID: channelId,
                receiverID: ctx.req.session.user,
            },
            relations: ["sender", "receiver"],
        });
        return [...recievedMessages, ...sentMessages];
    }
    async getUserMessages(channelId, userId, senderId) {
        return await DirectMessage_1.DirectMessage.find({
            where: {
                channelID: channelId,
                senderId: senderId,
                receiverID: userId,
            },
            relations: ["sender", "receiver"],
        });
    }
    async deleteMessageTable() {
        try {
            const messages = await DirectMessage_1.DirectMessage.find({});
            messages.map(async (msg) => {
                await DirectMessage_1.DirectMessage.delete({
                    _id: msg._id,
                });
            });
            return true;
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
            console.error(e);
        }
    }
    async createMessage(pubSub, channelId, receiverId, ctx, messageText) {
        try {
            const sender = await Member_1.Member.findOne({
                where: {
                    _id: ctx.req.session.user,
                },
            });
            const receiver = await Member_1.Member.findOne({
                where: {
                    _id: receiverId,
                },
            });
            const channel = await Channel_1.Channel.findOne({
                where: {
                    _id: channelId,
                },
            });
            if (!sender) {
                const notFoundError = (0, commonFunctions_1.throwNotFoundError)("sender");
                return {
                    success: false,
                    notFoundError: [notFoundError],
                };
            }
            if (!channel) {
                const notFoundError = (0, commonFunctions_1.throwNotFoundError)("channel");
                return {
                    success: false,
                    notFoundError: [notFoundError],
                };
            }
            if (!receiver) {
                const notFoundError = (0, commonFunctions_1.throwNotFoundError)("receiver");
                return {
                    success: false,
                    notFoundError: [notFoundError],
                };
            }
            const message = await DirectMessage_1.DirectMessage.create({
                channelID: channelId,
                senderId: ctx.req.session.user,
                receiverID: receiverId,
                TextMessage: messageText,
                sender: sender,
                receiver: receiver,
                channel: channel,
            });
            await message.save();
            const savedMessage = await DirectMessage_1.DirectMessage.findOne({
                where: {
                    channelID: channelId,
                    senderId: ctx.req.session.user,
                    receiverID: receiverId,
                    TextMessage: messageText,
                },
            });
            await pubSub.publish(exports_1.MESSAGE_ADDED_TOPIC, savedMessage);
            return {
                success: true,
                data: message,
            };
        }
        catch (e) {
            const resolverError = (0, commonFunctions_1.throwResolverError)(e);
            return {
                success: false,
                resolverError: [resolverError],
            };
        }
    }
    async updateMessage(messageId, messageText, pubSub) {
        try {
            const message = await DirectMessage_1.DirectMessage.findOne({
                where: {
                    _id: messageId,
                },
            });
            if (!message) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("message");
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
            message.TextMessage = messageText;
            await message.save();
            await pubSub.publish(exports_1.MESSAGE_UPDATED_TOPIC, message);
            return {
                success: true,
                data: message,
            };
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
        }
    }
    async deleteMessage(message_Id, pubSub) {
        try {
            const message = await DirectMessage_1.DirectMessage.findOne({
                where: {
                    _id: message_Id,
                },
            });
            if (!message) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("message");
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
            await DirectMessage_1.DirectMessage.delete({
                _id: message_Id,
            });
            await pubSub.publish(exports_1.MESSAGE_DELETED_TOPIC, message);
            return {
                success: true,
                data: message,
            };
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
        }
    }
    async seeMessage(message_Id, pubSub) {
        try {
            const message = await DirectMessage_1.DirectMessage.findOne({
                where: {
                    _id: message_Id,
                },
            });
            if (!message) {
                const errorMsg = (0, commonFunctions_1.throwNotFoundError)("message");
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
            if (message.receiverSeen) {
                return {
                    success: false,
                    error: [
                        {
                            message: "already seen",
                            item: "message",
                        },
                    ],
                };
            }
            message.receiverSeen = true;
            await message.save();
            await pubSub.publish(exports_1.MESSAGE_SEEN_TOPIC, message);
            return {
                success: true,
                data: message,
            };
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
        }
    }
};
exports.MessageResolver = MessageResolver;
__decorate([
    (0, type_graphql_1.Subscription)(() => DirectMessage_1.DirectMessage, {
        topics: exports_1.MESSAGE_ADDED_TOPIC,
        filter: ({ payload, args }) => payload.channelID === args.channelId,
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Arg)("channelId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DirectMessage_1.DirectMessage, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "newMessage", null);
__decorate([
    (0, type_graphql_1.Subscription)(() => DirectMessage_1.DirectMessage, {
        topics: exports_1.MESSAGE_UPDATED_TOPIC,
        filter: ({ payload, args }) => payload.channelID === args.channelId,
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Arg)("channelId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DirectMessage_1.DirectMessage, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messageUpdated", null);
__decorate([
    (0, type_graphql_1.Subscription)(() => DirectMessage_1.DirectMessage, {
        topics: exports_1.MESSAGE_DELETED_TOPIC,
        filter: ({ payload, args }) => payload.channelID === args.channelId,
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Arg)("channelId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DirectMessage_1.DirectMessage, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messageDeleted", null);
__decorate([
    (0, type_graphql_1.Subscription)(() => DirectMessage_1.DirectMessage, {
        topics: exports_1.MESSAGE_SEEN_TOPIC,
        filter: ({ payload, args }) => payload.channelID === args.channelId,
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Arg)("channelId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DirectMessage_1.DirectMessage, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messageSeen", null);
__decorate([
    (0, type_graphql_1.Query)(() => [DirectMessage_1.DirectMessage]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getAll", null);
__decorate([
    (0, type_graphql_1.Query)(() => [DirectMessage_1.DirectMessage]),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getAllReceivedMessages", null);
__decorate([
    (0, type_graphql_1.Query)(() => [DirectMessage_1.DirectMessage]),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getAllSentMessages", null);
__decorate([
    (0, type_graphql_1.Query)(() => [DirectMessage_1.DirectMessage]),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMyMessagesInChannel", null);
__decorate([
    (0, type_graphql_1.Query)(() => [DirectMessage_1.DirectMessage]),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => String)),
    __param(2, (0, type_graphql_1.Arg)("senderId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getUserMessages", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean || exports_1.resolverError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessageTable", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.messageStatus),
    __param(0, (0, type_graphql_1.PubSub)()),
    __param(1, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(2, (0, type_graphql_1.Arg)("receiverId", () => String)),
    __param(3, (0, type_graphql_1.Ctx)()),
    __param(4, (0, type_graphql_1.Arg)("message", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [type_graphql_1.PubSubEngine, String, String, Object, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.messageStatus || exports_1.resolverError),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("message", () => String)),
    __param(2, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "updateMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.messageStatus || exports_1.resolverError),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "deleteMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.messageStatus || exports_1.resolverError),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "seeMessage", null);
exports.MessageResolver = MessageResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MessageResolver);
//# sourceMappingURL=messages.js.map