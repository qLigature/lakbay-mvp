const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

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

}, {
  versionKey: false
});


// // Helper method for adding items to cart
// cartSchema.methods.add = function (newItem) {
//   const itemExists = this.items.find(item => {
//     return newItem.productId === item.productId.toString();
//   });

//   if (itemExists) {
//     itemExists.quantity += newItem.quantity;
//   } else {
//     this.items.push(newItem);
//   }

//   this.totalAmount = this.getTotalPrice();
//   return this.save();
// };

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
