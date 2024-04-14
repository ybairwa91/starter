const sendErrorDev = function (err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = function (err, res) {
  // Operational Error, trusted error: send message to client
  if (err.operational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming error or unknown error doesn't want client to know,don't leak error to client
  } else {
    // 1) Log the error
    console.log('ERROR🎇', err);
    // 2)send generic message

    res.status(500).json({
      status: err,
      message: 'something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack)

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
    // res.status(err.statusCode).json({
    //   // status: err.status,
    //   // message: err.message,
    //   sendErrorDev(err),
    //   error: err,
    //   stack: err.stack,
    // });
  } else if (process.env === 'production') {
    sendErrorProd(err, res);
    // status: err.status,
    // message: err.message,
  }
};

////explaining error handling here
//Bhai production phase me kum se kum or human friendly error show karo.bhai client ko kush bhi to rakhnaa h
//and developement me jyada se jyada info mile error ki taki production stage me issue kum ayee
//there are 2 types of error programming error and operational error
//or apan na operational error handle kar rhe h yaha par mainly in production and remember we are not going to send
//any programming error to client side
//bhai apan ne khud error create kiyee next use krke fir AppError se instance create krke apan ne khud error banayae
//now these are all operational Errors now only these error are going to sent to client coz these are all error something like
// id galat daal di,net chala gyaa,connection build nahi hua to client ko janna jaruri h na boss and hee will either rectify or basically connect
//using google*chatGtp
