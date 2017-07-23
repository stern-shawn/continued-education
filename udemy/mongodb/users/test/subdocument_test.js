const assert = require('assert');
const User = require('../src/User.js');

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }],
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('can append new posts to an existing user', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [],
    });

    // Save joe with no posts...
    joe.save()
      // Retrieve that record after saving...
      .then(() => User.findOne({ name: 'Joe' }))
      // Append a new post and save...
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      // Retrieve the record again by searching... (not sure why the instructor does this when the)
      // save operation returns the result in the promise...)
      // .then(() => User.findOne({ name: 'Joe' }))
      // Assert that the saved record has the new post in the right location
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove existing posts from a user', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }],
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove(); // Mongoose injects the remove method on elements, no splicing
        return user.save();
      })
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
