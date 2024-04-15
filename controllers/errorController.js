/* eslint-disable node/no-unsupported-features/es-syntax */
/*
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,

    error: err,
    stack: err.stack,
  });
};

*/
/////////////////////////////////////
//handling more specific errors
/*
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

//BASIC ERROR HANDLING KARLI
//AB KRENGEE MONGOOSE WALE
//simplify the validators error,wrong id data fetching,or creating a tour violating validator norms


*/
///////////////////////////////////////////////////////////////
/*
1.jab client wrong id dalegaa access ke liye to ye error ata hai
{
  "status": "error",
  "message": "Cast to ObjectId failed for value \"www\" (type string) at path \"_id\" for model \"Tour\"",
  "error": {
      "stringValue": "\"www\"",
      "valueType": "string",
      "kind": "ObjectId",
      "value": "www",
      "path": "_id",
      "reason": {},
      "name": "CastError",
      "message": "Cast to ObjectId failed for value \"www\" (type string) at path \"_id\" for model \"Tour\""
  },
  "stack": "CastError: Cast to ObjectId failed for value \"www\" (type string) at path \"_id\" for model \"Tour\"\n    at model.Query.exec (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\lib\\query.js:4498:21)\n    at Query.then (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\lib\\query.js:4592:15)"
}
///////////////////////////////////////////////
2.duplication wali error in mongoDB when u create a tour

{
    "status": "error",
    "message": "E11000 duplicate key error collection: test.tours index: name_1 dup key: { name: \"The Forest Hiker\" }",
    "error": {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "name": 1
        },
        "keyValue": {
            "name": "The Forest Hiker"
        },
        "statusCode": 500,
        "status": "error"
    },
    "stack": "MongoError: E11000 duplicate key error collection: test.tours index: name_1 dup key: { name: \"The Forest Hiker\" }\n    at MongoError.create (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\core\\error.js:59:12)\n    at toError (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\utils.js:130:22)\n    at F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\operations\\common_functions.js:258:39\n    at handler (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\core\\sdam\\topology.js:961:24)\n    at F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\cmap\\connection_pool.js:352:13\n    at handleOperationResult (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\core\\sdam\\server.js:567:5)\n    at MessageStream.messageHandler (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\cmap\\connection.js:308:5)\n    at MessageStream.emit (node:events:518:28)\n    at processIncomingData (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\cmap\\message_stream.js:144:12)\n    at MessageStream._write (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\node_modules\\mongodb\\lib\\cmap\\message_stream.js:42:5)\n    at writeOrBuffer (node:internal/streams/writable:564:12)\n    at _write (node:internal/streams/writable:493:10)\n    at Writable.write (node:internal/streams/writable:502:10)\n    at TLSSocket.ondata (node:internal/streams/readable:1007:22)\n    at TLSSocket.emit (node:events:518:28)\n    at addChunk (node:internal/streams/readable:559:12)"
}

//3.VALIDATION ERRORS IN mongoDb,means trying to update invalid data here
{
    "status": "error",
    "message": "Validation failed: name: A tour name must have minimum 10 characters or equal to 10, difficulty: Difficulty is either: easy,medium or difficult, ratingsAverage: A rating must be below or equals to 5.0",
    "error": {
        "errors": {
            "name": {
                "name": "ValidatorError",
                "message": "A tour name must have minimum 10 characters or equal to 10",
                "properties": {
                    "message": "A tour name must have minimum 10 characters or equal to 10",
                    "type": "minlength",
                    "minlength": 10,
                    "path": "name",
                    "value": "inam"
                },
                "kind": "minlength",
                "path": "name",
                "value": "inam"
            },
            "difficulty": {
                "name": "ValidatorError",
                "message": "Difficulty is either: easy,medium or difficult",
                "properties": {
                    "message": "Difficulty is either: easy,medium or difficult",
                    "type": "enum",
                    "enumValues": [
                        "easy",
                        "medium",
                        "difficult"
                    ],
                    "path": "difficulty",
                    "value": "whatever"
                },
                "kind": "enum",
                "path": "difficulty",
                "value": "whatever"
            },
            "ratingsAverage": {
                "name": "ValidatorError",
                "message": "A rating must be below or equals to 5.0",
                "properties": {
                    "message": "A rating must be below or equals to 5.0",
                    "type": "max",
                    "max": 5,
                    "path": "ratingsAverage",
                    "value": 6
                },
                "kind": "max",
                "path": "ratingsAverage",
                "value": 6
            }
        },
        "_message": "Validation failed",
        "statusCode": 500,
        "status": "error",
        "name": "ValidationError",
        "message": "Validation failed: name: A tour name must have minimum 10 characters or equal to 10, difficulty: Difficulty is either: easy,medium or difficult, ratingsAverage: A rating must be below or equals to 5.0"
    },
    "stack": "ValidationError: Validation failed: name: A tour name must have minimum 10 characters or equal to 10, difficulty: Difficulty is either: easy,medium or difficult, ratingsAverage: A rating must be below or equals to 5.0\n    at _done (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\lib\\helpers\\updateValidators.js:236:19)\n    at F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\lib\\helpers\\updateValidators.js:212:11\n    at schemaPath.doValidate.updateValidator (F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\lib\\helpers\\updateValidators.js:170:13)\n    at F:\\complete-node-bootcamp-master\\4-natours\\starter\\node_modules\\mongoose\\lib\\schematype.js:1273:9\n    at process.processTicksAndRejections (node:internal/process/task_queues:77:11)"
}

*/
//////////////////////////////////////////
const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate Field Value: ${value} Please Use another Value`;
  return new AppError(message, 404);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = function (err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = function (err, res) {
  // console.log(err)
  if (err.IsOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('ERROR🎇', err);
    res.status(500).json({
      status: err,
      message: 'something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };
    // console.log(error)
    // console.log(error.name);
    console.log(err);
    if (err.name === 'CastError') {
      err = handleCastErrorDB(err);
    }
    if (err.code === 11000) {
      err = handleDuplicateFieldsDB(err);
    }

    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

    sendErrorProd(err, res);
  }
};

//////////////////////////////////////////////


//finally there are some errors which are found outside of thee express
//something mongoDb connection
//unhandle promise rejection-means somewhere in our code a promise got rejected
//but that rejection has not been handled anywhere
//handling all promises in a project quite cumbersome so we need to globally handle all promises and how we do that
//handle at server.js