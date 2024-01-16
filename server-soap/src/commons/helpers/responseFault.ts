export const responseFault = (statusCode: number, message: string) => {
    return {
        Fault: {
            Reason: message,
            StatusCode: statusCode
        },
    };
}