const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  reservations: [{
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },

    // Will be copied from room reference
    name: {
      type: String,
      required: true
    },

    // Will be copied from room reference
    shortAddress: {
      type: String,
      required: true
    },

    // Will be copied from room reference (price)
    subtotal: {
      type: Number,
      required: true
    }
  }],

  totalPrice: {
    type: Number,
    required: true
  },

}, {
  versionKey: false
});


// Helper method for adding items to cart (TODO when booking feature has been expanded)
bookingSchema.methods.add = function (newRoom) {

  // const roomExists = this.reservations.find(reservation => {
  //   return newRoom.roomId === reservation.roomId.toString();
  // });

  // if (roomExists) {
  //   roomExists.quantity += roomExists.quantity;
  // } else {
  //   this.items.push(roomExists);
  // }

  // this.totalPrice = this.getTotalPrice();

  // Check if there is already a room in reservations, if so, return an error
  if (this.reservations.length > 0) {
    return new Error('Room already in booking, please remove your current booking first');
  }

  return this.save();
};

// // Helper method for removing items from cart
// cartSchema.methods.pop = function (productId) {
//   const itemIndex = this.items.findIndex(item => {
//     return productId === item.productId.toString();
//   });
//   if (itemIndex === -1) throw new Error('Cart item not found');

//   this.items.splice(itemIndex, 1);

//   this.totalAmount = this.getTotalPrice();
//   return this.save();
// };

// // Helper method for getting total price of all items in the cart
// cartSchema.methods.getTotalPrice = function () {
//   return this.items.reduce((total, item) => {
//     return total + item.quantity * item.price;
//   }, 0);
// };

module.exports = mongoose.model('Booking', bookingSchema);
