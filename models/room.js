const mongoose = require('mongoose');


const roomSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  // description: {
  //   type: String,
  //   required: true
  // },

  short_address: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Room', roomSchema);
