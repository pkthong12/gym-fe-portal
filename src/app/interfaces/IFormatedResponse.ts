export interface IFormatedResponse {
    messageCode: string;
    errorType: number; // none = 0; catchable = 1; uncatchable = 2
    statusCode: number;
    innerBody: any;
}