const User = require('../models/user');
const Reservation = require('../models/reservation');

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

// Get all reservations of the logged in user
exports.getUserReservations = async (req, res, next) => {

  const { status } = req.query;

  try {
    const user = await User.findById(req.user.id);
    if (!user) throw new Error('User not found');

    const reservations = await Reservation.find({ userId: req.user.id }).select('-userId -updatedAt -reservations._id -reservations.roomId');

    const filteredReservations = reservations.filter(c => {
      return (status ? (c.status === status) : true);
    });

    res.status(200).send(filteredReservations);

  } catch (error) {
    return next(error);
  }
};
