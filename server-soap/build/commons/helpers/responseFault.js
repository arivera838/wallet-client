"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFault = void 0;
const responseFault = (statusCode, message) => {
    return {
        Fault: {
            Reason: message,
            StatusCode: statusCode
        },
    };
};
exports.responseFault = responseFault;
