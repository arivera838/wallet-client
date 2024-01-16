import { ICLient } from "../../commons/Interfaces/IClient"
import { IWallet } from "../../commons/Interfaces/IWallet"
import { STATUS_ERROR } from "../../commons/constants/status-errors.constant"
import { responseFault } from "../../commons/helpers/responseFault"
import { validateClientExist, validateGetWallet, validateLoadWallet } from "../../commons/helpers/validators"
import getClient from "../../repository/getClient"
import getWalletRepository from "../../repository/getWallet"

const  getWallet = async (itemWallet: IWallet, callback: any) => {
    console.log("🚀 ~ getWal ~ itemWallet:", itemWallet)
    try {
        const validatorError = validateGetWallet(itemWallet)

        if(!!validatorError){
            throw validatorError
        }

        const wallet = await getWalletRepository(itemWallet)
        console.log("🚀 ~ getWal ~ wallet:", wallet)

        if (!wallet)
            throw STATUS_ERROR.WALLET_NOT;

        const client: ICLient = await getClient({ document: itemWallet.document })
        console.log("🚀 ~ getWal ~ client:", client)

        const validatorClientError = validateClientExist(client)

        if(!!validatorClientError){
            throw validatorClientError
        }
        const response = {...wallet, ...client};
        console.log("🚀 ~ getWal ~ response:", response)
        callback(null, response);

    } catch (error : any) {
        console.log("🚀 ~ getWal ~ error:", error)
        callback(responseFault(error?.statusCode || 400, error?.message || error) );
    }
}

export default getWallet