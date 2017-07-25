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
  location: {
    type: { // Special format for declaring geolocation type
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
});

module.exports = mongoose.model('Driver', DriverSchema);
