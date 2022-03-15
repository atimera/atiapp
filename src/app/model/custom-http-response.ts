import { User } from "./user";

export interface CustomHttpResponse {
    timeStamp: Date;
    httpStatusCode: number;
    HttpStatus: string;
    reason?: string;
    message?: string;
    developerMessage?: string;
    data: {user?: User, jwtHeader?: { 'Jwt-Token': string}}
}