import { DynamoDB } from 'aws-sdk'
import { IWallet } from '../commons/Interfaces/IWallet';
import { ICLient } from '../commons/Interfaces/IClient';
const dynamodb = new DynamoDB.DocumentClient({ 'region': process.env.REGION });

const getClient = async (itemClient: Partial<ICLient>) => {
    try {
        const {document} = itemClient
        const params = {
            TableName: process.env.TABLEWALLETCLIENT || 'wallet-client',
            Key: { document }
        }

        const res = await dynamodb.get(params).promise();
        return res.Item as ICLient

    } catch (error) {
        throw error
    }
}

export default getClient