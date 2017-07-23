require('dotenv').config();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB, {
  useMongoClient: true, // To get rid of the deprecation warning for connect() without config
});

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', warning => console.warn(`Warning: ${warning}`));

// Clear the list of users before running a test to ensure we have a clean DB
// Async action, so use the done() callback to control Mocha flow
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
