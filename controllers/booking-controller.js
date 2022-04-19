const Booking = require('../models/booking');
const Room = require('../models/room');
const Reservation = require('../models/reservation');

// Get booking(s) of the signed in user
exports.viewBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ userId: req.user.id }).select('-userId -_id');
    if (!booking) {
      return res.status(404).send({
        message: 'Booking not found'
      });
    }

    res.status(200).send(booking);
  } catch (err) {
    return next(err);
  }
};

// User adds a room listing to their bookings, creates a booking if one does not exist
exports.addRoom = async (req, res, next) => {

  try {
    const { roomId } = req.body;
    const room = await Room.findById({ _id: roomId });
    if (!room || !room.isAvailable) {
      return res.status(404).send({
        message: 'Room not found'
      });
    }

    console.log(room);

    const newRoom = {
      roomId,
      name: room.name,
      shortAddress: room.shortAddress,
      subtotal: room.price
    };

    // Create a booking if there isn't one, otherwise return an error
    const booking = await Booking.findOne({ userId: req.user.id });
    if (!booking) {

      const newBooking = new Booking({
        userId: req.user.id,
        reservations: [newRoom],
        totalPrice: room.price
      });
      await newBooking.save();

    } else {
      return res.status(400).send({
        message: 'Room already in booking, please remove your current booking first'
      });
    }

    res.status(200).send({
      message: 'Room added to booking'
    });
  } catch (error) {
    return next(error);
  }

};


// User removes their booking
exports.clearBooking = async (req, res, next) => {

  try {
    const booking = await Booking.findOne({ userId: req.user.id });
    if (!booking) {
      return res.status(404).send({
        message: 'Booking not found'
      });
    }

    await Booking.deleteOne({ userId: req.user.id });

    res.status(200).json({
      message: 'Booking has been cleared'
    });

  } catch (error) {
    return next(error);
  }

};

// User confirms their booking and creates a reservation
exports.confirmBooking = async (req, res, next) => {

  try {
    const booking = await Booking.findOne({ userId: req.user.id });
    if (!booking) {
      return res.status(404).send({
        message: 'Booking not found'
      });
    }

    const reservation = new Reservation({
      userId: req.user.id,
      status: 'booked',
      reservations: booking.reservations,
      totalPrice: booking.totalPrice
    });

    await reservation.save();
    await Booking.deleteOne({ userId: req.user.id });

    res.status(200).json({
      message: 'Booking complete, you have successfully reserved a room'
    });

  } catch (error) {
    return next(error);
  }

};
