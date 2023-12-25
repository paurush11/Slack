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
exports.ChannelResolver = void 0;
const type_graphql_1 = require("type-graphql");
const data_source_1 = require("../data-source");
const Channel_1 = require("../entity/Channel");
const Member_1 = require("../entity/Member");
const commonFunctions_1 = require("../utils/commonFunctions");
const exports_1 = require("./exports");
let ChannelResolver = class ChannelResolver {
    channels() {
        return Channel_1.Channel.find({
            relations: ["members"],
        });
    }
    getChannel(channelId) {
        console.log(channelId);
        return Channel_1.Channel.findOne({
            where: {
                _id: channelId
            },
            relations: ["members"],
        });
    }
    async clearChannels() {
        await data_source_1.AppDataSource.createQueryRunner().query("TRUNCATE TABLE channel CASCADE");
        return true;
    }
    async deleteChannel(channelId) {
        await Channel_1.Channel.delete({
            _id: channelId,
        });
        return true;
    }
    async createChannel(name, icon, description) {
        const exists = await Channel_1.Channel.findOne({
            where: {
                Name: name,
                IconName: icon,
                Description: description,
            },
        });
        if (exists) {
            return {
                errors: [
                    {
                        message: "Found",
                        item: "channel",
                    },
                ],
            };
        }
        const cn = await Channel_1.Channel.create({
            Name: name,
            IconName: icon,
            Description: description,
        });
        await cn.save();
        return { channel: cn };
    }
    async joinChannel(channelId, userId) {
        try {
            const channel = await Channel_1.Channel.findOne({
                where: {
                    _id: channelId,
                },
                relations: ["members"],
            });
            const user = await Member_1.Member.findOne({
                where: {
                    _id: userId,
                },
                relations: ["channels"],
            });
            if (!channel) {
                return (0, commonFunctions_1.throwNotFoundError)("channel");
            }
            if (!user) {
                return (0, commonFunctions_1.throwNotFoundError)("user");
            }
            if (!channel.members) {
                channel.members = [];
            }
            if (!user.channels) {
                user.channels = [];
            }
            if (channel.members.filter((member) => member._id === userId).length !==
                0 &&
                user.channels.filter((channel) => channel._id === channelId).length !==
                    0) {
                return true;
            }
            channel.members.push(user);
            await channel.save();
            return true;
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
        }
    }
    async leaveChannel(channelId, userId) {
        try {
            const channel = await Channel_1.Channel.findOne({
                where: {
                    _id: channelId,
                },
                relations: ["members"],
            });
            const user = await Member_1.Member.findOne({
                where: {
                    _id: userId,
                },
                relations: ["channels"],
            });
            if (!channel) {
                return (0, commonFunctions_1.throwNotFoundError)("channel");
            }
            if (!user) {
                return (0, commonFunctions_1.throwNotFoundError)("user");
            }
            if (!channel.members ||
                channel.members.filter((member) => member._id === userId).length === 0) {
                return (0, commonFunctions_1.throwNotFoundError)("user in channel");
            }
            channel.members = channel.members.filter((user) => user._id !== userId);
            await channel.save();
            return true;
        }
        catch (e) {
            return (0, commonFunctions_1.throwResolverError)(e);
        }
    }
};
exports.ChannelResolver = ChannelResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Channel_1.Channel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "channels", null);
__decorate([
    (0, type_graphql_1.Query)(() => Channel_1.Channel),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChannelResolver.prototype, "getChannel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "clearChannels", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "deleteChannel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.ChannelResponse),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("iconName")),
    __param(2, (0, type_graphql_1.Arg)("description")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "createChannel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean || exports_1.resolverError),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "joinChannel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean || exports_1.resolverError),
    __param(0, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("userId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "leaveChannel", null);
exports.ChannelResolver = ChannelResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ChannelResolver);
//# sourceMappingURL=channels.js.map