const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the user model
const UserSchema = new Schema({
  name: String,
});

// Associate this model to 'User' in mongodb and export
module.exports = mongoose.model('User', UserSchema);
