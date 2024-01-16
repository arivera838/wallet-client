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
const status_errors_constant_1 = require("../../commons/constants/status-errors.constant");
const status_pay_1 = require("../../commons/constants/status-pay");
const lessAmount_1 = __importDefault(require("../../commons/helpers/lessAmount "));
const responseFault_1 = require("../../commons/helpers/responseFault");
const validators_1 = require("../../commons/helpers/validators");
const changeStatus_1 = __importDefault(require("../../repository/changeStatus"));
const getClient_1 = __importDefault(require("../../repository/getClient"));
const getPayWallet_1 = __importDefault(require("../../repository/getPayWallet "));
const getWallet_1 = __importDefault(require("../../repository/getWallet"));
const loadWallet_1 = __importDefault(require("../../repository/loadWallet"));
const payConfirm = (itemWallet, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatorError = (0, validators_1.validatePayWallet)(itemWallet);
        if (!!validatorError) {
            throw validatorError;
        }
        const payWallet = yield (0, getPayWallet_1.default)(itemWallet);
        if (payWallet.status === status_pay_1.STATUS_PAY.APPROVED) {
            throw status_errors_constant_1.STATUS_ERROR.PAY_SUCCESS;
        }
        const client = yield (0, getClient_1.default)({ document: payWallet.document });
        const wallet = yield (0, getWallet_1.default)({ document: client.document, phoneNumber: client.phoneNumber });
        const validatorPayError = (0, validators_1.validatePayItem)(payWallet, wallet);
        if (!!validatorPayError) {
            throw validatorPayError;
        }
        const amount = (0, lessAmount_1.default)(wallet.amount, payWallet.amount);
        yield (0, loadWallet_1.default)(Object.assign(Object.assign({}, wallet), { amount: amount }));
        yield (0, changeStatus_1.default)(itemWallet);
        callback(null, Object.assign(Object.assign({}, wallet), { amount: amount, status: status_pay_1.STATUS_PAY.APPROVED, data: "Success Pay" }));
    }
    catch (error) {
        callback((0, responseFault_1.responseFault)((error === null || error === void 0 ? void 0 : error.statusCode) || 400, (error === null || error === void 0 ? void 0 : error.message) || error));
    }
});
exports.default = payConfirm;
