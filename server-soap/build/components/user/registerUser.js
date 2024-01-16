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
const validators_1 = require("../../commons/helpers/validators");
const putClient_1 = __importDefault(require("../../repository/putClient"));
const registerUser = (itemUser, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatorError = (0, validators_1.validateClient)(itemUser);
        if (!!validatorError) {
            throw validatorError;
        }
        yield (0, putClient_1.default)(itemUser);
        callback(null, itemUser);
    }
    catch (error) {
        callback((0, responseFault_1.responseFault)((error === null || error === void 0 ? void 0 : error.statusCode) || 400, (error === null || error === void 0 ? void 0 : error.message) || error));
    }
});
exports.default = registerUser;
