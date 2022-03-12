
export interface CustomHttpResponse {
    timeStamp: Date;
    httpStatusCode: number;
    HttpStatus: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: Map<any, any>;
}