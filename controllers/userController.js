const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  
  const users = await User.find();

  await res.status(200).json({
    status: 'Success',
    result: users.length,
    data: {
      users,  
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet to define mere bhai',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is yet not defined',
  });
};

exports.deleteUser = (req, res) => {
  res.staus(500).json({
    status: '',
    message: 'this route is yet to define brother',
  });
};
