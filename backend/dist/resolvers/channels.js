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
const Channel_1 = require("../entity/Channel");
const data_source_1 = require("../data-source");
let ChannelResolver = class ChannelResolver {
    channel() {
        return Channel_1.Channel.find({
            relations: ["members"]
        });
    }
    async clearChannels() {
        await data_source_1.AppDataSource.createQueryRunner().query('TRUNCATE TABLE channel CASCADE');
        return true;
    }
    async createChannel(name, description) {
        const cn = await Channel_1.Channel.create({
            Name: name,
            Description: description
        });
        await data_source_1.AppDataSource.manager.save(cn);
        return cn;
    }
};
exports.ChannelResolver = ChannelResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Channel_1.Channel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "channel", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "clearChannels", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Channel_1.Channel),
    __param(0, (0, type_graphql_1.Arg)("name")),
    __param(1, (0, type_graphql_1.Arg)("description")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ChannelResolver.prototype, "createChannel", null);
exports.ChannelResolver = ChannelResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ChannelResolver);
//# sourceMappingURL=channels.js.map