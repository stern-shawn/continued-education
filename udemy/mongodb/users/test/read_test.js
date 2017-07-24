const assert = require('assert');
const User = require('../src/User.js');

describe('Reading records', () => {
  // Declare joe ahead of time so we can have a reference to it in the 'it' blocks
  let joe;
  let shawn;
  let sean;
  let adam;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    shawn = new User({ name: 'Shawn' });
    sean = new User({ name: 'Sean' });
    adam = new User({ name: 'Adam' });

    Promise.all([joe.save(), shawn.save(), sean.save(), adam.save()])
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

  it('finds a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === joe.name);
        done();
      });
  });

  it('can skip and limit the result set', (done) => {
    // We don't know what order the records got saved in... so sort first so we can be sure
    // of the results order. .sort expects a key and 1 for ascending, -1 for descending order.
    User.find()
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then((users) => {
        // Assert that limit worked correctly, and that results are correct based on skip
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Sean');
        done();
      });
  });
});
