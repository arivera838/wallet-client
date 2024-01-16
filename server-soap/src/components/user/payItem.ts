import { ICLient } from "../../commons/Interfaces/IClient";
import { IPayWalleConfirm, IPayWallet } from "../../commons/Interfaces/IPayWallet";
import { STATUS_PAY } from "../../commons/constants/status-pay";
import creadeCode from "../../commons/helpers/creadeCode";
import createSessionId from "../../commons/helpers/createSessionId";
import { responseFault } from "../../commons/helpers/responseFault";
import sendEmail from "../../commons/helpers/sendEmail";
import { validateClientExist, validateLoadWallet, validatePayItem } from "../../commons/helpers/validators";
import createWalletPay from "../../repository/createWalletPay";
import getClient from "../../repository/getClient";
import getWalletRepository from "../../repository/getWallet";

const payItem = async (itemWallet: IPayWallet, callback: any) => {
    try {
        const validatorError = validateLoadWallet(itemWallet)

        if (!!validatorError) {
            throw validatorError
        }

        const wallet = await getWalletRepository(itemWallet)
        const validatorPayError = validatePayItem(itemWallet, wallet)
      
        if (!!validatorPayError) {
            throw validatorPayError
        }

        const client: ICLient = await getClient(itemWallet)
        const clientNotExist = validateClientExist(client)
   
        if (!!clientNotExist) {
            throw clientNotExist
        }

        const code = creadeCode()
        await sendEmail(client, code)

        const sessionId = createSessionId();

        const paramsPay: IPayWalleConfirm = {
            document: itemWallet.document,
            sessionId,
            code,
            amount: itemWallet.amount,
            status: STATUS_PAY.PENDING
        }
        
        await createWalletPay(paramsPay)

        callback(null, {
            sessionId
        });

    } catch (error: any) {
        callback(responseFault(error?.statusCode || 400, error?.message || error) );
    }
}

export default payItem