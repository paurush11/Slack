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
exports.DirectMessages = void 0;
const typeorm_1 = require("typeorm");
const Content_1 = require("./Content");
const Member_1 = require("./Member");
const Channel_1 = require("./Channel");
let DirectMessages = class DirectMessages extends Content_1.Content {
};
exports.DirectMessages = DirectMessages;
__decorate([
    (0, typeorm_1.Column)(() => String),
    __metadata("design:type", String)
], DirectMessages.prototype, "Message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Channel_1.Channel),
    __metadata("design:type", Channel_1.Channel)
], DirectMessages.prototype, "Channel", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Member_1.Member),
    __metadata("design:type", Member_1.Member)
], DirectMessages.prototype, "Sender", void 0);
exports.DirectMessages = DirectMessages = __decorate([
    (0, typeorm_1.Entity)()
], DirectMessages);
//# sourceMappingURL=DirectMessages.js.map