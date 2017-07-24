const assert = require('assert');
const User = require('../src/User.js');
const BlogPost = require('../src/BlogPost.js');

describe('User Middlewares', () => {
  let joe;
  let blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'MongoDB is great', content: 'You got that right!' });

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('automatically removes dangling BlogPosts when the User is removed', (done) => {
    joe.remove()
      .then(() => BlogPost.count()) // Returns # of BlogPosts in entire collection
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
