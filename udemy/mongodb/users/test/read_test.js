const assert = require('assert');
const User = require('../src/User.js');

describe('Reading records', () => {
  // Declare joe ahead of time so we can have a reference to it in the 'it' blocks
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  it('finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        // GOTCHA: _id is actually an ObjectId type, we need to convert to string before comparing
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });
});
