const express = require('express');
const router = express.Router();
const user = require('../controllers/user-controller');

router.get('/profile', user.viewProfile);
router.get('/profile/reservations', user.getUserReservations);

module.exports = router;
