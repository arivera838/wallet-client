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
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dynamodb = new aws_sdk_1.DynamoDB.DocumentClient({ 'region': process.env.REGION });
const getWalletRepository = (itemWallet) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { document, phoneNumber } = itemWallet;
        const params = {
            TableName: process.env.TABLEWALLET || 'wallet',
            Key: { document, phoneNumber }
        };
        const res = yield dynamodb.get(params).promise();
        return res.Item;
    }
    catch (error) {
        throw error;
    }
});
exports.default = getWalletRepository;
