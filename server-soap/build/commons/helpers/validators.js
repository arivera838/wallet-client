"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClientExist = exports.validatePayItem = exports.validatePayWallet = exports.validateGetWallet = exports.validateLoadWallet = exports.validateClient = void 0;
const status_errors_constant_1 = require("../constants/status-errors.constant");
const validateClient = (client) => {
    const { document, fullName, email, phoneNumber } = client;
    if (!document || !fullName || !email || !phoneNumber) {
        return status_errors_constant_1.STATUS_ERROR.PARAMETERS_ERROR;
    }
};
exports.validateClient = validateClient;
const validateLoadWallet = (wallet) => {
    const { document, phoneNumber, amount } = wallet;
    if (!document || !amount || !phoneNumber) {
        return status_errors_constant_1.STATUS_ERROR.PARAMETERS_ERROR;
    }
};
exports.validateLoadWallet = validateLoadWallet;
const validateGetWallet = (wallet) => {
    const { document, phoneNumber } = wallet;
    if (!document || !phoneNumber) {
        return status_errors_constant_1.STATUS_ERROR.PARAMETERS_ERROR;
    }
};
exports.validateGetWallet = validateGetWallet;
const validatePayWallet = (payWallet) => {
    const { sessionId, code } = payWallet;
    if (!sessionId || !code) {
        return status_errors_constant_1.STATUS_ERROR.PARAMETERS_ERROR;
    }
};
exports.validatePayWallet = validatePayWallet;
const validatePayItem = (walletItem, wallet) => {
    const { amount } = walletItem;
    if (!wallet)
        return status_errors_constant_1.STATUS_ERROR.WALLET_NOT;
    if (wallet.amount <= 0 || !!amount && amount > wallet.amount)
        return status_errors_constant_1.STATUS_ERROR.AMOUNT_NOT;
};
exports.validatePayItem = validatePayItem;
const validateClientExist = (client) => {
    if (!client) {
        return status_errors_constant_1.STATUS_ERROR.CLIENT_NOT_EXIST;
    }
};
exports.validateClientExist = validateClientExist;
