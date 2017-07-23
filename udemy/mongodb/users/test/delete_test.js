const assert = require('assert');
const User = require('../src/User.js');

describe('Deleting records', () => {
  // Declare joe ahead of time so we can have a reference to it in the 'it' blocks
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => done());
  });

  // Case for when we ALREADY have a retrieved instance of the User
  it('using model instance remove', (done) => {
    joe.remove()
      // Cool trick time. If .then returns a promise, we can chain .thens instead of nesting!
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  // Test the .remove() method on User class which takes in search criteria
  it('using class method remove', (done) => {
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  // Test the .findAndRemove() method on User class
  it('using class method findAndRemove', (done) => {
    User.findOneAndRemove({ _id: joe._id })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  // Test the .findByIdAndRemove() method on User class
  it('using class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
