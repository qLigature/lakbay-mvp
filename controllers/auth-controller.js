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

// Authenticates a user, returns a cookie containing the access token if successful
exports.login = async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      return res.status(401).send({
        message: 'Invalid email or password'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: 'Invalid email or password'
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 // 1 day
    });
    res.status(200).send({
      message: 'You have successfully logged in'
    });

  } catch (error) {
    return next(error);
  }
};