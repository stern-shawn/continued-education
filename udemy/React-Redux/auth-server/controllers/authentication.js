const jwt = require('jwt-simple');
const User = require('../models/User');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  // As a convention, JWTs have a 'sub' property, ie the 'subject' of the token.
  // 'iat' refers to 'issued at time' for determining expiration
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'Email and password must be defined' });
  }
  
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      }

      // If a new email, create and save new user
      const user = new User({
        email,
        password,
      });

      // Respond to the request indicating that new user has been created
      user.save()
        .then((user) => {
          // Respond, indicating that user was created successfully
          res.json({ token: tokenForUser(user) })
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
