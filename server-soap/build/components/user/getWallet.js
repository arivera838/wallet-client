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
const responseFault_1 = require("../../commons/helpers/responseFault");
const validators_1 = require("../../commons/helpers/validators");
const getClient_1 = __importDefault(require("../../repository/getClient"));
const getWallet_1 = __importDefault(require("../../repository/getWallet"));
const getWallet = (itemWallet, callback) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🚀 ~ getWal ~ itemWallet:", itemWallet);
    try {
        const validatorError = (0, validators_1.validateGetWallet)(itemWallet);
        if (!!validatorError) {
            throw validatorError;
        }
        const wallet = yield (0, getWallet_1.default)(itemWallet);
        console.log("🚀 ~ getWal ~ wallet:", wallet);
        if (!wallet)
            throw status_errors_constant_1.STATUS_ERROR.WALLET_NOT;
        const client = yield (0, getClient_1.default)({ document: itemWallet.document });
        console.log("🚀 ~ getWal ~ client:", client);
        const validatorClientError = (0, validators_1.validateClientExist)(client);
        if (!!validatorClientError) {
            throw validatorClientError;
        }
        const response = Object.assign(Object.assign({}, wallet), client);
        console.log("🚀 ~ getWal ~ response:", response);
        callback(null, response);
    }
    catch (error) {
        console.log("🚀 ~ getWal ~ error:", error);
        callback((0, responseFault_1.responseFault)((error === null || error === void 0 ? void 0 : error.statusCode) || 400, (error === null || error === void 0 ? void 0 : error.message) || error));
    }
});
exports.default = getWallet;
