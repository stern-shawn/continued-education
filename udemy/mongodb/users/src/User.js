const mongoose = require('mongoose');
const postSchema = require('./post');

const Schema = mongoose.Schema;

// Define the user model
const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
    required: 'A name is required',
  },
  postCount: Number,
  posts: [postSchema],
});

// Associate this model to 'User' in mongodb and export
module.exports = mongoose.model('User', UserSchema);
