const User = require('../models/User');

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
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
        .then((user) => res.json(user))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}
