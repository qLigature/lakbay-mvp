const Reservation = require('../models/reservation');

// Gets all reservations
exports.getAllReservations = async (req, res, next) => {

  const { status } = req.query;

  try {
    const reservationList = await Reservation.find();

    const filteredReservations = reservationList.filter(c => {
      return (status ? (c.status === status) : true);
    });

    res.status(200).send(filteredReservations);

  } catch (error) {
    return next(error);
  }
};

// Sets a single reservation to fulfilled
exports.fulfillReservation = async (req, res, next) => {

  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
      return res.status(404).send({
        message: 'Reservation not found'
      });
    }
    if (reservation.status === 'cancelled') {
      return res.status(400).send({
        message: 'Reservation has already been cancelled'
      });
    }

    reservation.status = 'fulfilled';

    await reservation.save();
    res.status(200).send({
      message: 'Reservation has been fulfilled'
    });

  } catch (error) {
    return next(error);
  }
};

// Sets a single reservation to cancelled
exports.cancelReservation = async (req, res, next) => {

  try {
    const reservation = await Reservation.findById(req.params.reservationId);
    if (!reservation) {
      return res.status(404).send({
        message: 'Reservation not found'
      });
    }
    if (reservation.status === 'fulfilled') {
      return res.status(400).send({
        message: 'Reservation has already been fulfilled'
      });
    }

    reservation.status = 'cancelled';

    await reservation.save();
    res.status(200).send({
      message: 'Reservation has been cancelled'
    });

  } catch (error) {
    return next(error);
  }
};
