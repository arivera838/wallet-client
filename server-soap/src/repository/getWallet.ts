import { DynamoDB } from 'aws-sdk'
import { IWallet } from '../commons/Interfaces/IWallet';
const dynamodb = new DynamoDB.DocumentClient({ 'region': process.env.REGION });

const getWalletRepository = async (itemWallet: Partial<IWallet>) => {
    try {
        const {document, phoneNumber} = itemWallet
        const params = {
            TableName: process.env.TABLEWALLET || 'wallet',
            Key: { document, phoneNumber }
        }

        const res = await dynamodb.get(params).promise();
        return res.Item as IWallet

    } catch (error) {
        throw error
    }
}

export default getWalletRepository