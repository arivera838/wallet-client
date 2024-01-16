import { DynamoDB } from 'aws-sdk'
import { IPayWalleConfirm } from '../commons/Interfaces/IPayWallet';
const dynamodb = new DynamoDB.DocumentClient({ 'region': process.env.REGION });

const getPayWallet  = async (itemWallet:  Partial<IPayWalleConfirm>) => {
    try {
        const {sessionId, code} = itemWallet
        const params = {
            TableName: process.env.TABLEWALLETPAY || 'wallet-pay',
            Key: { sessionId, code }
        }

        const res = await dynamodb.get(params).promise();
        return res.Item as IPayWalleConfirm

    } catch (error) {
        throw error
    }
}

export default getPayWallet 