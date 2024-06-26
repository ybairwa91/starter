/* eslint-disable no-unused-vars */
//Creating a class for handling error so that we can make a reusable mechanism
// HANDLING OPERATIONAL ERROR
//stack trace-means tell the error code position [gives us entire call stack as well],
//make sure that we don't include this method or class into stack trace

class AppError extends Error {
  constructor(message, statusCode) {
    //to call parent constructor

    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    //apan access krlengee na is code ke through ki agar operational error hai to hi hum ye return krayengee
    //all error create by ourself are operational errors
    //bhai next me error pass karenge to yahi pahuchengee na

    this.IsOperational = true;
    //save from stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

// new AppError(`Cant find ${req.originalUrl} on this server!`, 404)
