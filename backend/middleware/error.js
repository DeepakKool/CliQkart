const ErrorHandler = require("../utils/errorHandler")

 module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal server error'

    //Wrong Mongodb ID error
    if(err.name === 'CastError') {
        err = new ErrorHandler('Resource not found. Invalid :'+err.path, 400)
    }

    //Mongoose duplicate key error
    if(err.code === 11000)  {
        err = new ErrorHandler('Duplicate '+Object.keys(err.keyValue)+ ' entered', 400)
    }

    //Wrong jwt Error
    if(err.name === 'JsonWebTokenError')    {
        err = new ErrorHandler('Reset link invalid, try again', 400)
    }

    //Expired jwt Error
    if(err.name === 'TokenExpiredError')    {
        err = new ErrorHandler('Reset link Expired, try again', 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}






