const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Recommended value for this is 10, read bcrypt docs for more info 
const SALTROUNDS = 10;

const userSchema = mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    minlength: [2, 'First name must be at least 2 characters long']
  },

  lastName: {
    type: String,
    required: true,
    minlength: [2, 'Last name must be at least 2 characters long']
  },

  address: {
    type: String,
    required: true,
    minlength: [1, 'Invalid address']
  },

  phoneNum: {
    type: String,
    required: true,
    match: [/^(09|\+639)\d{9}$/, 'Invalid phone number']
  },

  email: {
    type: String,
    required: [true, 'Please input an email'],
    // Note: unique is NOT a validator, google for more details
    unique: true,
    immutable: true,
    // For email regex
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format']
  },

  password: {
    type: String,
    required: [true, 'Please input a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },

  isAdmin: {
    type: Boolean,
    default: false
  }

}, {
  // versionKey makes the _v field disappear, don't do this if versioning is critical
  versionKey: false
});


// Hash the password before saving, but only if a password is created or modified
userSchema.pre('save', async function () {

  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, SALTROUNDS);
    }
  } catch (err) {
    throw new Error('Something went wrong with your password');
  }
});

module.exports = mongoose.model('User', userSchema);
