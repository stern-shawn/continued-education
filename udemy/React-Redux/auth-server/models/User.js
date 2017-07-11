const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: String,
});

// Create and export the model for use
module.exports = mongoose.model('User', userSchema);
