// Enable Jest to take up to 30s to complete a test in case this is running on a slow machine
jest.setTimeout(10000);

const mongoose = require('mongoose');
// Import the User model so mongoose in the test context is aware of that model!
require('../models/User');
// Get our connection keys and connect the test instance of mongoose to our remote db via keys
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });
