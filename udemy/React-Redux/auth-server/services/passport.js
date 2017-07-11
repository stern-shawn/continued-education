const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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
