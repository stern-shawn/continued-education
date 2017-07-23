const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Schema for the post sub-document of User (NOT a separate Mongoose model)
const postSchema = new Schema({
  title: String,
});

module.exports = postSchema;
