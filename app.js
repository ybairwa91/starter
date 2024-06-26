/* eslint-disable no-unused-vars */
//Packages to install
// const express = require('express');
// const morgan = require('morgan');
// const tourRouter = require('./routes/tourRoutes');
// const userRouter = require('./routes/userRoutes');

// When you call express(), it returns an instance of an Express application.
//create an instance of express js
// You’ll see this app variable used to set up routes, middleware, and listen for incoming requests.
// app represents your entire Express application, and you’ll use it to define your routes and handle incoming requests!
// const app = express();

//morgan--basically logs the request by user[like url,statusCode,response time.....]
//basically a logging middleware for http request
/*
Environment Variables:
1.Environment variables are dynamic values that can affect how a program behaves.
2.They are set outside the application and can be accessed within the code.

process.env:
In Node.js, process.env is an object that contains all environment variables.
You can access environment variables using the dot notation (e.g., process.env.VARIABLE_NAME).

NODE_ENV:
NODE_ENV is a common environment variable used in web development.
It typically indicates the environment in which your application is running (e.g., development, production, testing).

Common values for NODE_ENV:
development: Used during local development.
production: Used in a live production environment.
*/

/*

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}



//basically parse incoming request json file and makes accessible to req.body object
//uske baad req.body work karegee bhai
app.use(express.json());
//see in public folder there are so many static files and we fetch them through nodejs but to work it smoothly we use static middleware
app.use(express.static(`${__dirname}/public`))
//our own created middleware and next() for next middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware🔅');
  next();
})
//just time middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

//see middlewares execute evrytime btw a request-response cycle until and unless u specified a path,so if u specify a path it will only
//execute when u hit that request and same happening here as well.
//routers middleware 


// app.use() is a method that adds middleware functions to the application’s request-response cycle.
// Middleware functions can process requests, modify the request or response objects, or perform other tasks.
// parameter of app.use()
// first parameter
// '/api/v1/tours':
// This is the path or route where the middleware will be applied.
// When a client sends an HTTP request to this path (e.g., GET /api/v1/tours), the middleware will be executed.
// tourRouter:
// tourRouter is likely an instance of an Express router.
// Routers allow you to define routes and their associated handlers separately from the main application.
// It contains route definitions related to tours (e.g., GET /, POST /, GET /:id, etc.).
// What It Does:
// When a client sends a request to the path /api/v1/tours, the tourRouter middleware will handle it.
// Depending on the HTTP method (e.g., GET, POST, PATCH, DELETE), the corresponding route handler from tourRouter will be executed.
//  // tourRoutes.js
// const express = require('express');
// const tourController = require('../controllers/tourController');

// const router = express.Router();

// // Define route for getting all tours
// router.route('/').get(tourController.getAllTours);

// module.exports = router;


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;


*/

////////////////////////////////////////////////////////

/*
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//this is the place where defining a middleware and if is called means not handled by rest of the routers
//so yes u can define a router here which handle the unknown request from client which basically cant served by the server
//* is for rest of the paths which are not specified

// app.all('*',(req,res,next)=>{
//   res.status(404).json({
//     status:'fail',
//     message:`cant find ${req.originalUrl} on the server!`
//   })

// })

//LETS CREATE AN ERROR
//this route handle all unhandled route
app.all('*', (req, res, next) => {

  const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;
  //next() in a special way
  //passing parameter in next means definitely there is an error
  //if u pass err in next then it will skip all middlewares in stack and just redirect to global error handling middleware and execute it
  next(err);
  });


//bro if any middleware has 4 parameter express automatically understand it as error handling middleware
//we call it error first function why coz of first argument is error itself

app.use((err, req, res, next) => {
  console.log(err.stack)
  //lets read statuscode dynamically
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'; 
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

});
  

module.exports = app;


*/

////////////////////////////////////////////////////

/*

const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//Import AppError
const AppError=require('./utils/appError')
//IMPORT handler
const globalErrorHandler=require('./controllers/errorController')

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {

  // const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  
  // next(err);


  next(new AppError(`Cant find ${req.originalUrl} on this server!`,404));

  });


//is handler or middleware ko bhi export krde kyaa
//handlers are part of controller in MVC architecture
//so lets create a error controller

// app.use((err, req, res, next) => {
//   console.log(err.stack)

//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error'; 
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//   });

// });
  
app.use(globalErrorHandler)

module.exports = app;


*/

//////////////////////////////

const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
//this is a small function can help u to find errors
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);



app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
