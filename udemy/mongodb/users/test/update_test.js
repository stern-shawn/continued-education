const assert = require('assert');
const User = require('../src/User.js');

describe('Updating records', () => {
  // Declare joe ahead of time so we can have a reference to it in the 'it' blocks
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  // Helper function to reduce repeated assertion code
  const assertName = (operation, done) => {
    operation
      .then(() => User.find())
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  };

  // Using the .set method with an existing instance (can do series of changes before saving to DB)
  it('instance can set and save', (done) => {
    // Modify the user, and check all users to be sure there's only one with the new name
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  // Using the .update method with an existing instance (immediately apply updates, no save())
  it('instance can update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });
});
