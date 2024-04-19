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

///////////////////////////////////////

//AUTHENTICATION

// 1) More realistic user signup details
// 2) install jsonwebtoken npm
// 3) read its documentation
// 4) import it

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser._id }, 'secret');

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
