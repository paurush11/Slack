"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const channels_1 = require("./channels");
const members_1 = require("./members");
const messages_1 = require("./messages");
const posts_1 = require("./posts");
const vote_1 = require("./vote");
const resolvers = [
    members_1.memberResolver,
    channels_1.ChannelResolver,
    messages_1.MessageResolver,
    posts_1.PostResolver,
    vote_1.VoteResolver,
];
exports.default = resolvers;
//# sourceMappingURL=index.js.map