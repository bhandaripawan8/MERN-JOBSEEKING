
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message  = err.message || "internal server error"
    err.statusCode = err.statusCode || 500

    if(err.name === 'CaseError') {
        const message = `Resource not found. ${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }

    if(err.name === 'jsonWebTokenError') {
        const message = `jsonWebToken is invalid, try again`;
        err = new ErrorHandler(message, 400)
    }

    if(err.name === 'TokenExpiredError') {
        const message = `Json web token is expired, try again`;
        err = new ErrorHandler(message, 400)
    }

    return res.status(statusCode).json({
        success: false,
        message: err.message,
    })
}

export default ErrorHandler;