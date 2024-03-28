import { HttpError } from "../utils/HttpError.js";

export const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(err.statusCode).json(
            err.message instanceof Object
                ? err.message
                : {
                      message: err.message,
                  }
        );
    } else {
        res.status(500).json({
            message: "Internal Server Error",
        });
        console.log(err);
    }
};
