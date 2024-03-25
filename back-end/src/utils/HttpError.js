export class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode ? statusCode : 400;
    }
}