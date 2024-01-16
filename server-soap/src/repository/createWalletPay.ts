import { DynamoDB } from 'aws-sdk'
import { IPayWalleConfirm, IPayWallet } from '../commons/Interfaces/IPayWallet';
const dynamodb = new DynamoDB.DocumentClient({ 'region': process.env.REGION });

const createWalletPay = async (itemPay: Partial<IPayWalleConfirm | IPayWallet>) => {
    try {
        let paramsPay = {
            TableName: process.env.TABLEWALLETPAY || 'wallet-pay',
            Item: itemPay
        };

        return await dynamodb.put(paramsPay).promise()
    } catch (error) {
        throw error
    }
}

export default createWalletPay