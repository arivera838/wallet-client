import { DynamoDB } from 'aws-sdk'
import { IWallet } from '../commons/Interfaces/IWallet';
const dynamodb = new DynamoDB.DocumentClient({ 'region': process.env.REGION });

const loadWalletRepository = async (itemWallet: IWallet) => {
    try {
        let paramsUser = {
            TableName: process.env.TABLEWALLET || 'wallet',
            Item: itemWallet
        };

        await dynamodb.put(paramsUser).promise()

        return itemWallet
    } catch (error) {
        throw error
    }
}

export default loadWalletRepository