const assert = require('assert');
const User = require('../src/User.js');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync(); // Synchronous version of validation op
    const { message } = validationResult.errors.name;

    assert(message === 'A name is required');
  });
});
