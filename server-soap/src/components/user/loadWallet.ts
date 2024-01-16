'use strict'

import { IWallet } from '../../commons/Interfaces/IWallet';
import { responseFault } from '../../commons/helpers/responseFault';
import sumAmount from '../../commons/helpers/sumAmount';
import { validateLoadWallet } from '../../commons/helpers/validators';
import getWalletRepository from '../../repository/getWallet';
import loadWalletRepository from '../../repository/loadWallet';

const loadWallet = async (itemWallet: IWallet, callback: any) => {
    try {
        const validatorError = validateLoadWallet(itemWallet)

        if(!!validatorError){
            throw validatorError
        }

        const wallet = await getWalletRepository(itemWallet)

        if(!!wallet) {
            itemWallet.amount = sumAmount(wallet.amount, itemWallet.amount) 
        }

        await loadWalletRepository(itemWallet)
        callback(null, itemWallet);

    } catch (error : any) {
        callback(responseFault(error?.statusCode || 400, error?.message || error) );
    }
}

export default loadWallet