const User = require('../models/user');

// Get all users
exports.getAllUsers = async (req, res, next) => {

  try {
    const users = await User.find();
    res.status(200).send(users);

  } catch (error) {
    next(error);
  }
};