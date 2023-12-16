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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const type_graphql_1 = require("type-graphql");
const data_source_1 = require("../data-source");
const Channel_1 = require("../entity/Channel");
const Member_1 = require("../entity/Member");
const commonFunctions_1 = require("../utils/commonFunctions");
let UserInput = class UserInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
let resolverError = class resolverError {
};
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
resolverError = __decorate([
    (0, type_graphql_1.ObjectType)()
], resolverError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [resolverError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Member_1.Member, { nullable: true }),
    __metadata("design:type", Member_1.Member)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let memberResolver = class memberResolver {
    users() {
        return Member_1.Member.find({
            relations: ["channels"]
        });
    }
    async clearTable() {
        await data_source_1.AppDataSource.createQueryRunner().query('TRUNCATE TABLE member CASCADE');
        return true;
    }
    async createUser(ctx, channelId, data, password) {
        const parentChannel = await Channel_1.Channel.findBy({
            _id: channelId
        });
        const hashedPassword = await argon2_1.default.hash(password);
        const user = await Member_1.Member.create(Object.assign(Object.assign({}, data), { password: hashedPassword, channels: parentChannel }));
        if (!parentChannel[0].members) {
            parentChannel[0].members = [];
        }
        parentChannel[0].members.push(user);
        console.log(parentChannel);
        try {
            await user.save().then(e => {
                console.log(e);
            });
            await parentChannel[0].save();
        }
        catch (Error) {
            return { errors: [(0, commonFunctions_1.throwResolverError)(Error)] };
        }
        return { user };
    }
};
exports.memberResolver = memberResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Member_1.Member]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], memberResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], memberResolver.prototype, "clearTable", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("channelId", () => String)),
    __param(2, (0, type_graphql_1.Arg)('data', () => UserInput)),
    __param(3, (0, type_graphql_1.Arg)('data', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UserInput, String]),
    __metadata("design:returntype", Promise)
], memberResolver.prototype, "createUser", null);
exports.memberResolver = memberResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], memberResolver);
//# sourceMappingURL=members.js.map