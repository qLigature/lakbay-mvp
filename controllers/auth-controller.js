const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Registers a non-admin user
exports.registerUser = async (req, res, next) => {

  const { email, password } = req.body;

  const user = new User({
    email,
    password
  });

  try {
    await user.save();
    res.status(201).send({
      message: 'User created successfully'
    });

  } catch (error) {
    return next(error);
  }
};