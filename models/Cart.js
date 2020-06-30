const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  products: [
    {
      product: {
        type: Object
      },
      count: {
        type: Number
      }
    }
  ],
  quantity: {
    type: Number
  },
  total: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Cart = mongoose.model('cart', CartSchema);
