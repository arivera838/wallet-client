'use strict';
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
const responseFault_1 = require("../../commons/helpers/responseFault");
const sumAmount_1 = __importDefault(require("../../commons/helpers/sumAmount"));
const validators_1 = require("../../commons/helpers/validators");
const getWallet_1 = __importDefault(require("../../repository/getWallet"));
const loadWallet_1 = __importDefault(require("../../repository/loadWallet"));
const loadWallet = (itemWallet, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatorError = (0, validators_1.validateLoadWallet)(itemWallet);
        if (!!validatorError) {
            throw validatorError;
        }
        const wallet = yield (0, getWallet_1.default)(itemWallet);
        if (!!wallet) {
            itemWallet.amount = (0, sumAmount_1.default)(wallet.amount, itemWallet.amount);
        }
        yield (0, loadWallet_1.default)(itemWallet);
        callback(null, itemWallet);
    }
    catch (error) {
        callback((0, responseFault_1.responseFault)((error === null || error === void 0 ? void 0 : error.statusCode) || 400, (error === null || error === void 0 ? void 0 : error.message) || error));
    }
});
exports.default = loadWallet;
