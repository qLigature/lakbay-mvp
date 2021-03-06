const express = require('express');
const router = express.Router();
const room = require('../controllers/room-controller');

router.get('/', room.getAvailableRooms);
router.get('/:roomId', room.getAvailableRoomById);

module.exports = router;