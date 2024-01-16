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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const soap = __importStar(require("soap"));
const fs = __importStar(require("fs"));
// Define the content of the SOAP service
const service = {
    WalletService: {
        WalletPort: {
            RegistroCliente: (args, callback) => {
                const { Documento, Nombres, Email, Celular } = args;
                // Validate required parameters
                if (!Documento || !Nombres || !Email || !Celular) {
                    return callback({ statusCode: 404, message: 'Missing required parameters' });
                }
                const resultado = 'Cliente registrado exitosamente';
                // Call the callback with null to indicate no errors and provide the result
                callback(null, { Resultado: resultado });
            },
            CargaDinero: (args) => {
                // Implement the logic for the CargaDinero operation here
                // args.Documento, args.Monto contain the input data
                // Return the result as an object matching the response message structure
                return {
                    Resultado: 'Dinero cargado exitosamente',
                };
            },
            Compra: (args) => {
                // Implement the logic for the Compra operation here
                // args.Documento, args.CodigoConfirmacion contain the input data
                // Return the result as an object matching the response message structure
                return {
                    Resultado: 'Compra realizada exitosamente',
                };
            },
            ConsultaSaldo: (args) => {
                // Implement the logic for the ConsultaSaldo operation here
                // args.Documento contains the input data
                // Return the balance as an object matching the response message structure
                return {
                    Saldo: 100.0, // Suppose the balance is $100.0
                };
            },
        },
    },
};
// Create an instance of Express and a SOAP server
const app = (0, express_1.default)();
const xml = fs.readFileSync('WalletService.wsdl', 'utf8');
const server = app.listen(3000, function () {
    console.log(`SOAP server listening at `);
});
// Publish the SOAP service at /wallet
soap.listen(app, '/wallet', service, xml);
