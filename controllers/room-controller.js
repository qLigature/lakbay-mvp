const Room = require('../models/room');


// Gets available rooms with limited info (for guests and users)
exports.getAvailableRooms = async (req, res, next) => {

  try {
    const roomList = await Room.find({
      isAvailable: true
    });

    res.status(200).send(roomList);

  } catch (error) {
    return next(error);
  }
};

// Gets all rooms (for admin)
exports.getAllRooms = async (req, res, next) => {

  try {
    const roomList = await Room.find();

    res.status(200).send(roomList);

  } catch (error) {
    return next(error);
  }
};

// Create a new room listing
exports.createRoom = async (req, res, next) => {

  try {
    const newRoom = await Room.create(req.body);

    res.status(201).send(newRoom);

  } catch (error) {
    return next(error);
  }
};

// Get a room by ID, that is available
exports.getAvailableRoomById = async (req, res, next) => {

  try {
    const room = await Room.findById(req.params.roomId);

    if (!room) {
      return res.status(404).send({
        message: 'Room not found'
      });
    }

    if (!room.isAvailable) {
      return res.status(404).send({
        message: 'Room not found'
      });
    }

    res.status(200).send(room);

  } catch (error) {
    return next(error);
  }
};

// Updates room info
exports.updateRoomDetails = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).send({
        message: 'Room not found'
      });
    }

    const updatedRoom = Object.assign(room, req.body);

    await updatedRoom.save();
    res.status(200).send({
      message: 'Room updated successfully'
    });

  } catch (error) {
    return next(error);
  }
};

// Toggles room availability (soft delete)
exports.toggleRoomAvailability = async (req, res, next) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).send({
        message: 'Room not found'
      });
    }

    room.isAvailable = !room.isAvailable;
    const availability = room.isAvailable ? 'available' : 'unavailable';
    await room.save();
    res.status(200).send({
      message: `Availability toggled, room is now ${availability}`
    });

  } catch (error) {
    return next(error);
  }
};