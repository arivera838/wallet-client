import { ICLient } from "../Interfaces/IClient";
import { IPayWalleConfirm } from "../Interfaces/IPayWallet";
import { IWallet } from "../Interfaces/IWallet";
import { STATUS_ERROR } from "../constants/status-errors.constant";

export const validateClient = (client: ICLient): { statusCode: number; message: string } | undefined => {
    const { document, fullName, email, phoneNumber } = client;

    if (!document || !fullName || !email || !phoneNumber) {
        return STATUS_ERROR.PARAMETERS_ERROR;
    }
}

export const validateLoadWallet = (wallet: IWallet): { statusCode: number; message: string } | undefined => {
    const { document, phoneNumber, amount } = wallet;

    if (!document || !amount || !phoneNumber) {
        return STATUS_ERROR.PARAMETERS_ERROR;
    }
}


export const validateGetWallet = (wallet: Partial<IWallet>): { statusCode: number; message: string } | undefined => {
    const { document, phoneNumber } = wallet;

    if (!document || !phoneNumber) {
        return STATUS_ERROR.PARAMETERS_ERROR;
    }
}

export const validatePayWallet = (payWallet: Partial<IPayWalleConfirm>): { statusCode: number; message: string } | undefined => {
    const { sessionId, code } = payWallet;

    if (!sessionId || !code) {
        return STATUS_ERROR.PARAMETERS_ERROR;
    }
}

export const validatePayItem = (walletItem: Partial<IWallet>, wallet: IWallet): { statusCode: number; message: string } | undefined => {
    const { amount } = walletItem;
    if (!wallet)
        return STATUS_ERROR.WALLET_NOT;

    if (wallet.amount <= 0 || !!amount && amount > wallet.amount)
        return STATUS_ERROR.AMOUNT_NOT;
}

export const validateClientExist = (client: ICLient): { statusCode: number; message: string } | undefined => {
    if (!client) {
        return STATUS_ERROR.CLIENT_NOT_EXIST;
    }
}
