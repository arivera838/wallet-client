import createSoapClient from "./connnectSoap";

export const registerClient = async (event) => {
    try {
        const client = await createSoapClient();
        const res = await client.RegistroClienteAsync(event);
        return res[0]
    } catch (error) {
        throw error
    }
}