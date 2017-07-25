const mongoose = require('mongoose');

const Driver = mongoose.model('Driver');

exports.greeting = (req, res) => {
  res.json({ hi: 'welcome' });
};

exports.createDriver = (req, res, next) => {
  const driverProps = req.body;
  Driver.create(req.body)
    .then(driver => res.json(driver))
    .catch(next);
};

exports.editDriver = (req, res, next) => {
  const driverProps = req.body;
  const id = req.params.id;

  // Pass the new props to the driver using id for searching
  // Passing the new: true options config ensures we get the updated driver back,
  // instead of the diff information findByIdAndUpdate passes back by default
  Driver.findByIdAndUpdate(id, driverProps, { new: true })
    .then(driver => res.json(driver))
    .catch(next);
  };

exports.deleteDriver = (req, res, next) => {
  const id = req.params.id;

  // Use status code 204 to indicate successful removal and return the now-removed driver
  Driver.findByIdAndRemove(id)
    .then(driver => res.status(204).json(driver))
    .catch(next);
  };
