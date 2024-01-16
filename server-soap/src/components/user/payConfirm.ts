import { ICLient } from "../../commons/Interfaces/IClient"
import { IPayWalleConfirm, IPayWallet } from "../../commons/Interfaces/IPayWallet"
import { IWallet } from "../../commons/Interfaces/IWallet"
import { STATUS_ERROR } from "../../commons/constants/status-errors.constant"
import { STATUS_PAY } from "../../commons/constants/status-pay"
import lessAmount from "../../commons/helpers/lessAmount "
import { responseFault } from "../../commons/helpers/responseFault"
import { validatePayItem, validatePayWallet } from "../../commons/helpers/validators"
import changeStatus from "../../repository/changeStatus"
import getClient from "../../repository/getClient"
import getPayWallet from "../../repository/getPayWallet "
import getWalletRepository from "../../repository/getWallet"
import loadWalletRepository from "../../repository/loadWallet"

const payConfirm = async (itemWallet: Partial<IPayWalleConfirm>, callback: any) => {
    try {
        const validatorError = validatePayWallet(itemWallet)
        if (!!validatorError) {
            throw validatorError
        }

        const payWallet: IPayWalleConfirm = await getPayWallet(itemWallet)

        if(payWallet.status === STATUS_PAY.APPROVED) {
            throw STATUS_ERROR.PAY_SUCCESS
        }

        const client: ICLient = await getClient({ document: payWallet.document })
        const wallet: IWallet = await getWalletRepository({ document: client.document, phoneNumber: client.phoneNumber })

        const validatorPayError = validatePayItem(payWallet, wallet)

        if (!!validatorPayError) {
            throw validatorPayError
        }

        const amount = lessAmount(wallet.amount, payWallet.amount)
        await loadWalletRepository({ ...wallet, amount: amount })
        await changeStatus(itemWallet)

        callback(null, { ...wallet, amount: amount, status: STATUS_PAY.APPROVED, data: "Success Pay" });

    } catch (error: any) {
        callback(responseFault(error?.statusCode || 400, error?.message || error));
    }
}

export default payConfirm