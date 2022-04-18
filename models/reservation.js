const mongoose = require('mongoose');


const reservationSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // status: {
  //   type: String,
  //   enum: ['pending', 'finished', 'cancelled'],
  //   default: 'pending'
  // },

  reservations: [{
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
      required: true
    },

    // Will be copied from listing reference
    name: {
      type: String,
      required: true
    },

    // Will be copied from listing reference
    short_address: {
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
  },

  updatedAt: {
    type: Date,
    default: () => Date.now()
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Reservation', reservationSchema);
