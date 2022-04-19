const express = require('express');
const router = express.Router();
const booking = require('../controllers/booking-controller');

router.get('/', booking.viewBooking);
router.post('/add', booking.addRoom);
router.delete('/clear', booking.clearBooking);

router.post('/confirm', booking.confirmBooking);

module.exports = router;
