const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

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

// Pre-save hook, generate secure password before saving the model
userSchema.pre('save', function(next) {
  const user = this;

  // Generate a salt
  bcrypt.genSalt(10, function(saltErr, salt) {
    if (saltErr) { return next(saltErr); }

    // Hash (encrypt) the password using the generated salt
    bcrypt.hash(user.password, salt, null, function(hashErr, hash) {
      if (hashErr) { return next(hashErr); }

      // Replace the password with the encrypted value if successful
      user.password = hash;
      next();
    });
  });
});

// Create and export the model for use
module.exports = mongoose.model('User', userSchema);
