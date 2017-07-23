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
  posts: [postSchema],
});

// Define a 'getter', ie joe.postCount is a function that returns a value, not a primitive itself
// In particular, this getter returns how many posts the user has
UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

// Associate this model to 'User' in mongodb and export
module.exports = mongoose.model('User', UserSchema);
