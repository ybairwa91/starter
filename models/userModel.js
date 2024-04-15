const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please give ur id'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Provide a valid email'],
  },
  photo: {
    type: String,
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: 8,
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm Your Password'],
  },
});

//Model should always be capital letters
const User = mongoose.model('User', userSchema);

module.exports = User;
