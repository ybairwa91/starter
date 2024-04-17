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
