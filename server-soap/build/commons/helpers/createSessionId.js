"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const createSessionId = () => {
    const sessionID = (0, uuid_1.v4)();
    return sessionID;
};
exports.default = createSessionId;
