"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_ERROR = void 0;
exports.STATUS_ERROR = {
    PARAMETERS_ERROR: { statusCode: 404, message: 'Missing required parameters' },
    CLIENT_NOT_EXIST: { statusCode: 404, message: 'Client  does not exist' },
    WALLET_NOT: { statusCode: 404, message: 'Client has not a wallet' },
    AMOUNT_NOT: { statusCode: 400, message: "Client  has no balance" },
    PAY_SUCCESS: { statusCode: 400, message: "Payment made" }
};
