const assert = require('assert');
const User = require('../src/User.js');

describe('Virtual types', () => {
  it('postCount returns the number of posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }],
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
