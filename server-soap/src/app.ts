import express from 'express';
import * as soap from 'soap';
import * as fs from 'fs';

require('dotenv').config();
import registerUser from './components/user/registerUser';
import { ICLient } from './commons/Interfaces/IClient';
import { responseFault } from './commons/helpers/responseFault';
import { IWallet } from './commons/Interfaces/IWallet';
import loadWallet from './components/user/loadWallet';
import payItem from './components/user/payItem';
import payConfirm from './components/user/payConfirm';
import getWallet from './components/user/getWallet';



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
      RegistroCliente: async (args: ICLient, callback: any) => {
        await registerUser(args, callback)
      },
      CargaDinero: async (args: IWallet, callback: any) => {
        await loadWallet(args, callback)
      },
      Pagar: async (args: any, callback: any) => {
        await payItem(args, callback)
      },
      ConfirmarPago: async (args: any, callback: any) => {
        await payConfirm(args, callback)
      },
      ConsultaSaldo: async (args: any, callback: any) => {
        await getWallet(args, callback)
      },
    },
  },
};

// Create an instance of Express and a SOAP server
const app = express();
const xml = fs.readFileSync('WalletService.wsdl', 'utf8');
app.listen(3000, function () {
  console.log(`SOAP server listening at `);
});

// Publish the SOAP service at /wallet
soap.listen(app, '/wallet', service, xml);