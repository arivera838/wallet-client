'use strict'

import { ICLient } from '../../commons/Interfaces/IClient';
import { ResponseHelper } from '../../commons/helpers/response.helper';
import { registerClient } from '../../services/serviceUser';

export const registerUser = async (_event, context, callback) => {
    try {
        const event: ICLient = JSON.parse(_event.body)
        const response = await registerClient(event)

        ResponseHelper.response({
            statusCode: 200,
            body: response,
            callback
        });
    } catch (error) {
        ResponseHelper.response({
            statusCode: error.statusCode || 400,
            body: error.body,
            callback
        })
    }
}