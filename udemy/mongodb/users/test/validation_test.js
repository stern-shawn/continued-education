const assert = require('assert');
const User = require('../src/User.js');

describe('Validating records', () => {
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
});
