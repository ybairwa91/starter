/* eslint-disable import/no-extraneous-dependencies */
//////////////////////////////////////////////////
//learning to sign up
/*

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

// module.exports = (fn) => (req, res, next) => {
//     fn(req, res, next).catch(next);
//   };
// function catchAsync(fn) {
//   return function (req, res, next) {
//     fn(req, res, next).catch(err=>next(err));
//   };
// }

//creating a handlerFunction called signup
//signup matlab actually creating a database with account and its details
exports.signup = catchAsync(async (req, res, next) => {
  //game of mongoose
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

*/
//ab sign up ke baad kya hota hai na ki we create a token.

///////////////////////////////////////

//AUTHENTICATION

// 1) More realistic user signup details
// 2) install jsonwebtoken npm
// 3) read its documentation
// 4) import it.

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

//////////////////////////////////
//bhai apan ne signup kara to data jo h wo user 
//bhejega server ko jo apan
//database me save kr rhee h
//now what happen is that when user login with his credentials
//we try to match the same with the store data and if matched
// then only give
//furthur permission to use some specific features

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exists

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) check if the user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  //How to compare these two password
  // ('testtesttest')="$2a$12$fXwFgG2kG58CnVyC.O6l0eawmQZ5TFlF0/TwcyFdx8xt0iMPbjcO2"
  //again use bcrypt package
  //create a function for that basically in userModel(MVC model)
  //since we created instance method available on all document

  if (!user || !(await user.correctPassword(password, user.password))) {
    // console.log(user);
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) everything is okay ,send token to client
  const token = signToken(user._Id);

  res.status(200).json({
    status: 'success',
    token,
  });
});
