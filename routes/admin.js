const express = require('express');
const router = express.Router();
const user = require('../controllers/user-controller');
const room = require('../controllers/room-controller');
const reservationRouter = require('./reservations');

const { verifyAdmin } = require('../middleware/verify-token');

router.use(verifyAdmin);

router.get('/users', user.getAllUsers);

router.use('/reservations', reservationRouter);

router.get('/rooms', room.getAllRooms);
router.get('/rooms/:roomId', room.getRoomById);
router.post('/rooms', room.createRoom);
router.put('/rooms/:roomId', room.updateRoomDetails);
router.patch('/:roomId/toggle', room.toggleRoomAvailability);

module.exports = router;
