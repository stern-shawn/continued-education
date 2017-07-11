const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Middleware to authenticate using jwt, and DON'T create a cookie session (since we're doing jwt anyway)
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // DUmmy route to test if you get unauthroized if making a GET without a valid authorization header
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'You are authenticated!' });
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
