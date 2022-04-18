const express = require('express');
const router = express.Router();
const user = require('../controllers/user-controller');
const room = require('../controllers/room-controller');

const { verifyAdmin } = require('../middleware/verify-token');

router.use(verifyAdmin);

router.get('/users', user.getAllUsers);
// router.patch('/users/elevate', user.elevateUser);

// router.use('/orders', orderRouter);

// router.get('/products', product.getAllProducts);
router.post('/rooms', room.createRoom);
router.patch('/:roomId', room.updateRoomDetails);
router.patch('/:roomId/toggle', room.toggleRoomAvailability);


module.exports = router;
