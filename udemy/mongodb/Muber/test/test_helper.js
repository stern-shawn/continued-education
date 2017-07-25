const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Wrap connection in a before block with done callback to ensure connection before
// continuing to tests
before((done) => {
  mongoose.connect('mongodb://localhost/muber_test', {
    useMongoClient: true, // To get rid of the deprecation warning for connect() without config
  });

  mongoose.connection
    .once('open', () => done())
    .on('error', warning => console.warn(`Warning: ${warning}`));
});

// Clear the list of drivers before running a test to ensure we have a clean DB
beforeEach((done) => {
  cleanupDrivers(done);
});

// Cleanup afterwards
after((done) => {
  cleanupDrivers(done);
});

// Helper function for refactoring common cleanup code
const cleanupDrivers = done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    .then(() => done())
    .catch(() => done());
}
