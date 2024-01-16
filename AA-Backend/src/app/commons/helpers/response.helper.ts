import { ResponseModel } from "../models/response.model";

export class ResponseHelper {
    public static response = (props: ResponseModel) => {
        const {statusCode, body, callback} = props;
        const response = {
            statusCode: !!statusCode ? statusCode : 400,
            body: JSON.stringify(body),
            headers:{ 'Access-Control-Allow-Origin' : '*' }
        }
        callback(null, response)
    }
}
