import createSoapClient from "./connnectSoap";

export class WalletService {

    static loadWallet = async (event) => {
        try {
            const client = await createSoapClient();
            const res = await client.CargaDineroAsync(event);
            return res[0]
        } catch (error) {
            throw error
        }
    }

    static payItem = async (event) => {
        try {
            const client = await createSoapClient();
            const res = await client.PagarAsync(event);
            return res[0]
        } catch (error) {
            throw error
        }
    }

    static payConfirm = async (event) => {
        try {
            const client = await createSoapClient();
            const res = await client.ConfirmarPagoAsync(event);
            return res[0]
        } catch (error) {
            throw error
        }
    }

    static getWallet = async (event) => {
        try {
            const client = await createSoapClient();
            const res = await client.ConsultaSaldoAsync(event);
            return res[0]
        } catch (error) {
            throw error
        }
    }
}
