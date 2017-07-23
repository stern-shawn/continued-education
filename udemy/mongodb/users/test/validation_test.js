const assert = require('assert');
const User = require('../src/User.js');

describe('Validating records', () => {
  // The following two tests are checking the validation methods built into the User class,
  // using the synchronous version to check for errors without actually saving to the DB
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync(); // Synchronous version of validation op
    const { message } = validationResult.errors.name;

    assert(message === 'A name is required');
  });

  it('requires a user name to be longer than 2 characters', () => {
    const user = new User({ name: 'Sh' });
    const validationResult = user.validateSync(); // Synchronous version of validation op
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters');
  });

  // This test attempts to save to the remote DB and checks if validators protect our db
  it('prevents an invalid user from being saved', (done) => {
    const user = new User({ name: 'Sh' });
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters');
        done();
      });
  });
});
