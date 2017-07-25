const Driver = require('../models/Driver');

exports.greeting = (req, res) => {
  res.json({ hi: 'welcome' });
};

exports.createDriver = (req, res, next) => {
  const driverProps = req.body;
  Driver.create(req.body)
    .then(driver => res.json(driver))
    .catch(next);
  };
