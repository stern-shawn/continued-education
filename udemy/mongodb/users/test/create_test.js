const assert = require('assert');
const User = require('../src/User.js');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => {
        // Mongo objects have an isNew property that is true if it has not yet been saved
        // Thus we can assert successful save by checking for false once .save() has resolved
        assert(!joe.isNew);
        done();
      });
  });
});
