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
  it('An instance can set and save', (done) => {
    // Modify the user, and check all users to be sure there's only one with the new name
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  // Using the .update method with an existing instance (immediately apply updates, no save())
  it('An instance can update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  // Using the update method of the User class
  it('A model class can update', (done) => {
    assertName(
      // 1st arg: Search criteria. 2nd arg: What props to update
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done,
    );
  });

  it('A model class can find and update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done,
    );
  });

  it('A model class can find and update one record by Id', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done,
    );
  });
});
