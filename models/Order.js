const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  type: {
    type: String
  },
  cart: {
    type: Object
  },
  phone: {
    type: Number
  },
  location: {
    type: String
  },
  district: {
    type: String
  },
  thana: {
    type: String
  },
  origin: {
    type: String
  },
  section: {
    type: String
  },
  state: {
    type: String
  },
  deliveryCost: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);
