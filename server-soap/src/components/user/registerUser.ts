'use strict'

import { ICLient } from '../../commons/Interfaces/IClient';
import { responseFault } from '../../commons/helpers/responseFault';
import { validateClient } from '../../commons/helpers/validators';
import putClient from '../../repository/putClient';

const registerUser = async (itemUser: ICLient, callback: any) => {
    try {
        const validatorError = validateClient(itemUser)

        if(!!validatorError){
            throw validatorError
        }
        await putClient(itemUser)
        callback(null, itemUser);

    } catch (error: any) {
        callback(responseFault(error?.statusCode || 400, error?.message || error));
    }
}

export default registerUser
