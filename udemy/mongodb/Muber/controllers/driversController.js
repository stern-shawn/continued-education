const Driver = require('../models/Driver');

exports.greeting = (req, res) => {
  res.json({ hi: 'welcome' });
};

exports.createDriver = (req, res) => {
  console.log(req.body);
  res.json(req.body);
};
