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
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'BlogPost',
  }],
});

// Define a 'getter', ie joe.postCount is a function that returns a value, not a primitive itself
// In particular, this getter returns how many posts the user has
UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

// Define a pre-remove middleware to clean up the user's blog posts before removing the User record
UserSchema.pre('remove', function (next) {
  // Bring in our BlogPost model with mongoose, don't import directly!
  const BlogPost = mongoose.model('BlogPost');

  // Look at all blog posts
  // Look at the id of each post
  // If the id is contained in the array blogPosts, perform the op (.remove)
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

// Associate this model to 'User' in mongodb and export
module.exports = mongoose.model('User', UserSchema);
