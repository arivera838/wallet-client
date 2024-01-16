import { DynamoDB } from 'aws-sdk'
import { ICLient } from '../commons/Interfaces/IClient';
import { IPayWalleConfirm } from '../commons/Interfaces/IPayWallet';
import { STATUS_CODES } from 'http';
import { STATUS_PAY } from '../commons/constants/status-pay';
const dynamodb = new DynamoDB.DocumentClient({ 'region': process.env.REGION });

const changeStatus = async (itemWallet: Partial<IPayWalleConfirm>) => {
    try {
        const {sessionId, code} = itemWallet
        let params = {
            TableName: process.env.TABLEWALLETPAY || 'wallet-pay',
            Key: {sessionId, code},
            UpdateExpression: 'SET #status = :status',
            ExpressionAttributeNames: {
                '#status': 'status'
            },
            ExpressionAttributeValues: {
                ':status': STATUS_PAY.APPROVED
            }
        }

        dynamodb.update(params).promise();

    } catch (error) {
        throw error
    }
}

export default changeStatus;