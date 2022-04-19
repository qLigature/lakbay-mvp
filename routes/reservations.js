const express = require('express');
const router = express.Router();
const reservation = require('../controllers/reservation-controller');

router.get('/', reservation.getAllReservations);

router.patch('/:reservationId/fulfill', reservation.fulfillReservation);
router.patch('/:reservationId/cancel', reservation.cancelReservation);

module.exports = router;
