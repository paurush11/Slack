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
const Member_1 = require("../entity/Member");
const commonFunctions_1 = require("../utils/commonFunctions");
const exports_1 = require("./exports");
let memberResolver = class memberResolver {
    users() {
        return Member_1.Member.find({
            relations: ["channels", "messagesSent", "messagesReceived"],
        });
    }
    async clearUsers() {
        await data_source_1.AppDataSource.createQueryRunner().query("TRUNCATE TABLE member CASCADE");
        return true;
    }
    async Me(ctx) {
        if (!ctx.req.session.user) {
            return null;
        }
        try {
            const user = await Member_1.Member.findOne({
                where: {
                    _id: ctx.req.session.user,
                },
                relations: ["channels", "messagesSent", "messagesReceived"],
            });
            return user;
        }
        catch (e) {
            console.error(e);
        }
    }
    async register(ctx, data, password) {
        console.log(password);
        const passError = (0, commonFunctions_1.validatePassword)(password);
        if (passError) {
            return { errors: [passError] };
        }
        const errors = (0, commonFunctions_1.validateUserCreationInput)(data);
        if (errors) {
            return { errors: [errors] };
        }
        const hashedPassword = await argon2_1.default.hash(password);
        const user = await Member_1.Member.create(Object.assign(Object.assign({}, data), { password: hashedPassword }));
        try {
            await user.save();
            ctx.req.session.user = user._id;
            return { user };
        }
        catch (Error) {
            return { errors: [(0, commonFunctions_1.throwResolverError)(Error)] };
        }
    }
    async login(ctx, usernameOrEmail, password) {
        const user = await Member_1.Member.findOne({
            where: usernameOrEmail.includes("@")
                ? {
                    email: usernameOrEmail,
                }
                : {
                    username: usernameOrEmail,
                },
        });
        if (!user) {
            return {
                errors: [
                    (0, commonFunctions_1.throwResolverError)({
                        message: "No such user found",
                        name: "User not found",
                        code: "404",
                        detail: "User is not found!! ",
                    }),
                ],
            };
        }
        const validity = await argon2_1.default.verify(user.password, password);
        if (!validity) {
            return {
                errors: [
                    {
                        message: "password",
                        name: "Incorrect Password",
                        code: "422",
                        detail: "Please Enter a correct password!!",
                    },
                ],
            };
        }
        try {
            await user.save();
            ctx.req.session.user = user._id;
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
], memberResolver.prototype, "clearUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => Member_1.Member, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], memberResolver.prototype, "Me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.UserResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("data", () => exports_1.UserCreationInput)),
    __param(2, (0, type_graphql_1.Arg)("password", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, exports_1.UserCreationInput, String]),
    __metadata("design:returntype", Promise)
], memberResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => exports_1.UserResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __param(1, (0, type_graphql_1.Arg)("usernameOrEmail", () => String)),
    __param(2, (0, type_graphql_1.Arg)("password", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], memberResolver.prototype, "login", null);
exports.memberResolver = memberResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], memberResolver);
//# sourceMappingURL=members.js.map