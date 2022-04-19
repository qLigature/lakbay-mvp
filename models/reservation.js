const mongoose = require('mongoose');


const reservationSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  status: {
    type: String,
    enum: ['booked', 'fulfilled', 'cancelled'],
    default: 'booked'
  },

  reservations: [{
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },

    // Will be copied from listing reference
    name: {
      type: String,
      required: true
    },

    // Will be copied from listing reference
    shortAddress: {
      type: String,
      required: true
    },

    // Will be copied from listing reference (price)
    subtotal: {
      type: Number,
      required: true
    }
  }],

  totalPrice: {
    type: Number,
    required: true
  },

  reservedAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  }

  // updatedAt: {
  //   type: Date,
  //   default: () => Date.now()
  // }
}, {
  versionKey: false
});

module.exports = mongoose.model('Reservation', reservationSchema);
