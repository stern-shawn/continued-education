exports.validateSignup = (req, res, next) => {
  // Check to ensure that name, email, and password are:
  // -Not blank
  // -Sanitized for html and blanks
  // -Normalized if email
  console.log('IMMA FIRIN MAH VALIDATOR');
  req.checkBody('firstName', 'You must supply a first name!').notEmpty();
  req.sanitizeBody('firstName');

  req.checkBody('lastName', 'You must supply a last name!').notEmpty();
  req.sanitizeBody('lastName');

  req.checkBody('email', 'That email is invalid!').isEmail().notEmpty();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
    remove_extension: false,
  });

  req.checkBody('password', 'Password cannot be blank!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.json({ validationErrors: errors.map(err => err.msg) });
  }
  // No errors detected, continue to signup middleware
  next();
}
