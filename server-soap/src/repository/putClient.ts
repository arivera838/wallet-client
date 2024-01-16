import { DynamoDB } from 'aws-sdk'
import { ICLient } from '../commons/Interfaces/IClient';
const dynamodb = new DynamoDB.DocumentClient({ 'region': process.env.REGION });

const putClient = async (itemUser: ICLient) => {
    try {
        let paramsUser = {
            TableName: process.env.TABLEWALLETCLIENT || 'wallet-client',
            Item: itemUser
        };

        return await dynamodb.put(paramsUser).promise()
    } catch (error) {
        throw error
    }
}

export default putClient;