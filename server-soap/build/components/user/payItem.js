"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_pay_1 = require("../../commons/constants/status-pay");
const creadeCode_1 = __importDefault(require("../../commons/helpers/creadeCode"));
const createSessionId_1 = __importDefault(require("../../commons/helpers/createSessionId"));
const responseFault_1 = require("../../commons/helpers/responseFault");
const sendEmail_1 = __importDefault(require("../../commons/helpers/sendEmail"));
const validators_1 = require("../../commons/helpers/validators");
const createWalletPay_1 = __importDefault(require("../../repository/createWalletPay"));
const getClient_1 = __importDefault(require("../../repository/getClient"));
const getWallet_1 = __importDefault(require("../../repository/getWallet"));
const payItem = (itemWallet, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatorError = (0, validators_1.validateLoadWallet)(itemWallet);
        if (!!validatorError) {
            throw validatorError;
        }
        const wallet = yield (0, getWallet_1.default)(itemWallet);
        const validatorPayError = (0, validators_1.validatePayItem)(itemWallet, wallet);
        if (!!validatorPayError) {
            throw validatorPayError;
        }
        const client = yield (0, getClient_1.default)(itemWallet);
        const clientNotExist = (0, validators_1.validateClientExist)(client);
        if (!!clientNotExist) {
            throw clientNotExist;
        }
        const code = (0, creadeCode_1.default)();
        yield (0, sendEmail_1.default)(client, code);
        const sessionId = (0, createSessionId_1.default)();
        const paramsPay = {
            document: itemWallet.document,
            sessionId,
            code,
            amount: itemWallet.amount,
            status: status_pay_1.STATUS_PAY.PENDING
        };
        yield (0, createWalletPay_1.default)(paramsPay);
        callback(null, {
            sessionId
        });
    }
    catch (error) {
        callback((0, responseFault_1.responseFault)((error === null || error === void 0 ? void 0 : error.statusCode) || 400, (error === null || error === void 0 ? void 0 : error.message) || error));
    }
});
exports.default = payItem;
