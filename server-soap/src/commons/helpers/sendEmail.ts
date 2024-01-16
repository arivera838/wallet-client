import nodemailer from "nodemailer";
import { ICLient } from "../Interfaces/IClient";
import AWS from "aws-sdk";

const sendEmail = async (client: ICLient, code: string) => {
    try {

        var params = {
            Destination: {
                ToAddresses: [client.email],
            },
            Message: {
                Body: {
                    Text: { Data: `Tu codigo para confirmar tu pago es ${code} ` },
                },

                Subject: { Data: "Codigo de confirmacion" },
            },
            Source: "riveragu.andres@gmail.com",
        };

        await new AWS.SES({region: process.env.REGION}).sendEmail(params).promise();
    } catch (error) {
        throw error
    }
}

export default sendEmail