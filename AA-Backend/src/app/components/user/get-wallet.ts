'use strict'

import { IWallet } from '../../commons/Interfaces/IWallet';
import { ResponseHelper } from '../../commons/helpers/response.helper';
import { WalletService } from '../../services/serviceWallet';

export const getWallet = async (_event, context, callback) => {
    try {
        const event: IWallet = JSON.parse(_event.body)
        const response = await WalletService.getWallet(event)

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