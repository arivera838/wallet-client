export interface IPayWallet {
    document: string;
    phoneNumber: string;
    amount: number;
}

export interface IPayWalleConfirm {
    sessionId: string;
    code: string;
    document: string;
    status: string;
    amount: number;
}