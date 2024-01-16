'use strict'

import { IPayWallet } from '../../commons/Interfaces/IPayWallet';
import { ResponseHelper } from '../../commons/helpers/response.helper';
import { WalletService } from '../../services/serviceWallet';

export const payItem = async (_event, context, callback) => {
    try {
        const event: IPayWallet = JSON.parse(_event.body)
        const response = await WalletService.payItem(event)

        ResponseHelper.response({
            statusCode: 200, 
            body: response,
            callback
        });
    } catch (error) {
        ResponseHelper.response({
            statusCode: error.statusCode,
            body: error.body,
            callback
        })
    }
}