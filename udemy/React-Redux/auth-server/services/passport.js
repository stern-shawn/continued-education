const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create a local strategy
const localOptions = {
  // Username is expected by default, tell passport to look at the req.body.email field instead
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify that the email and password exist already and are correct, otherwise call done with false to report unauthorized
  User.findOne({ email })
    .then(user => {
      // Search completed, but no matches found
      if (!user) { return done(null, false); }

      // Compare supplied password with stored password. Do this by encrypting the submitted password and seeing if it matches
      // the value of the encrypted password in the database
      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }

        return done(null, user);
      })
    })
    .catch(err => done(err));
});

// Set up the options for the JWT Strategy
const jwtOptions = {
  // Look at the header 'authorization' field for the token
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // Use the same secret that was used to do the encoding for decoding the jwt...
  secretOrKey: process.env.SECRET,
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in this payload exists in our DB, user is valid, call done with that user
  // Otherwise, just call done to indicate no auth success
  User.findById(payload.sub)
    .then(user => {
      // Search found a matching user
      if (user) {
        done(null, user);
      } else {
        // Search succeeded but didn't return a user
        done(null, false);
      }
    })
    // Search failed
    .catch(err => done(err, false));
});

// Tell Passport to use the strategy
passport.use(jwtLogin);
passport.use(localLogin);
