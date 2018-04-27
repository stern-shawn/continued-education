const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
  // Calling next executes the next middleware, ex the route handler, then after await, control comes back to this fn!
  await next();

  clearHash(req.user.id);
};
