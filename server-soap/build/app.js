"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const soap = __importStar(require("soap"));
const fs = __importStar(require("fs"));
require('dotenv').config();
const registerUser_1 = __importDefault(require("./components/user/registerUser"));
const loadWallet_1 = __importDefault(require("./components/user/loadWallet"));
const payItem_1 = __importDefault(require("./components/user/payItem"));
const payConfirm_1 = __importDefault(require("./components/user/payConfirm"));
const getWallet_1 = __importDefault(require("./components/user/getWallet"));
/* import { SharedIniFileCredentials, Config } from 'aws-sdk';

const awsConfig = new Config({
  credentials: new SharedIniFileCredentials({ profile: 'your-profile-name' }),
  region: 'us-east-1', // Replace with your desired AWS region
});
 */
// Define the content of the SOAP service
const service = {
    WalletService: {
        WalletPort: {
            RegistroCliente: (args, callback) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, registerUser_1.default)(args, callback);
            }),
            CargaDinero: (args, callback) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, loadWallet_1.default)(args, callback);
            }),
            Pagar: (args, callback) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, payItem_1.default)(args, callback);
            }),
            ConfirmarPago: (args, callback) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, payConfirm_1.default)(args, callback);
            }),
            ConsultaSaldo: (args, callback) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, getWallet_1.default)(args, callback);
            }),
        },
    },
};
// Create an instance of Express and a SOAP server
const app = (0, express_1.default)();
const xml = fs.readFileSync('WalletService.wsdl', 'utf8');
app.listen(3000, function () {
    console.log(`SOAP server listening at `);
});
// Publish the SOAP service at /wallet
soap.listen(app, '/wallet', service, xml);
