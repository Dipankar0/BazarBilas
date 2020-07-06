const mongoose = require('mongoose');

const OriginSchema = new mongoose.Schema({
  name: {
    type: String
  },
  section: {
    type: String
  },
  available: {
    type: String
  },
  landing: {
    type: String
  },
  files: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Origin = mongoose.model('origin', OriginSchema);
