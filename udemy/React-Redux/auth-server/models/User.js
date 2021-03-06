const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// Define the model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address',
  },
  password: {
    type: String,
    required: 'Please supply a password',
  },
  firstName: {
    type: String,
    required: 'Please supply a first name',
  },
  lastName: {
    type: String,
    required: 'Please supply a last name',
  },
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

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // this.password refers to the password on this instance
  // Internally, bcrypt is salt/hashing the incoming password to compare with the stored value
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create and export the model for use
module.exports = mongoose.model('User', userSchema);
