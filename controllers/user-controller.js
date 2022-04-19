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

// Get the logged in user's profile
exports.viewProfile = async (req, res, next) => {

  try {
    const user = await User.findById(req.user.id).select('-_id -isAdmin');
    if (!user) throw new Error('User not found');

    res.status(200).send(user);

  } catch (error) {
    return next(error);
  }
};

