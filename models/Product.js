const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String
  },
  quantity: {
    type: String
  },
  originId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'origin'
  },
  notPrice: {
    type: Number
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  code: {
    type: Number
  },
  hotSell: {
    type: String
  },
  available: {
    type: String
  },
  totalSold: {
    type: Number
  },
  files: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Product = mongoose.model('product', ProductSchema);
