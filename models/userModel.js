const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');

// CREATING A SCHEMA OR SAYING BLUEPRINT
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
  },

  //PASSWORD MANAGEMENT IS ONE SUCH IMP ASPECT IN BACKEND
  // 1) Create a schema for password and passwordConfirm both
  // 2) create a custom validator for both field to be same
  // 3) now document password must be stored in document but u must encrypt it in database as well

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
  },
  
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm Your Password'],
    // Remember that validate only work on save.
    //custom validators work on only on CREATE AND SAVE!!!
    //ultimately saying when u create a new doc
    validate: {
      validator: function (el) {
        return el === this.password; //el is passwordConfirm  here itself
      },
      message: 'Password are not the match',
    },
  },
});

//Encrypt  password storing during signup itself
// a mongoose middleware will be our saviour
// using document middleware
// a presave middleware works before saving the doc
// call this encrypting password also hashing
//INSTALL decrypting PACKAGE called bcryptjs
// import it
// lets c how
userSchema.pre('save', async function (next) {
  //ONLY run this when only password is modified
  if (!this.isModified('password')) return next();

  //HASHING the password with the cost 12,higher the cost more cpu intensive work
  this.password = await bcrypt.hash(this.password, 12);

  // delete the passcon.. field
  this.passwordConfirm = undefined;
  next();
});

//Model should always be capital letters
const User = mongoose.model('User', userSchema);

module.exports = User;
