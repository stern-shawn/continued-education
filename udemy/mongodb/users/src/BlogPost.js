const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  // This'll be an array of refences to comments that sit in another, 'Comment' collection
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
