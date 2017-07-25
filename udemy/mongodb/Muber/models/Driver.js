const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: 'Please supply an email',
  },
  driving:{
    type: Boolean,
    default: false,
  },
  // Location: {}
});

module.exports = mongoose.model('Driver', DriverSchema);
