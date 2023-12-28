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
exports.SubscriptionResolver = void 0;
const DirectMessage_1 = require("../entity/DirectMessage");
const type_graphql_1 = require("type-graphql");
const exports_1 = require("./exports");
class SubscriptionResolver {
    async newMessage(messagePayload, channelId) {
        console.log('Subscription payload received:', messagePayload);
        return messagePayload;
    }
    async newMessageArrived(messagePayload) {
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
}
exports.SubscriptionResolver = SubscriptionResolver;
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
], SubscriptionResolver.prototype, "newMessage", null);
__decorate([
    (0, type_graphql_1.Subscription)(() => DirectMessage_1.DirectMessage, {
        topics: exports_1.MESSAGE_ADDED_TOPIC,
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DirectMessage_1.DirectMessage]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "newMessageArrived", null);
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
], SubscriptionResolver.prototype, "messageUpdated", null);
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
], SubscriptionResolver.prototype, "messageDeleted", null);
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
], SubscriptionResolver.prototype, "messageSeen", null);
//# sourceMappingURL=subscriptions.js.map