const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/User.js');
const Comment = require('../src/Comment.js');
const BlogPost = require('../src/BlogPost.js');

describe('Associations', () => {
  let joe;
  let blogPost;
  let comment;

  beforeEach((done) => {
    // Separately initialize all of our basic collections...
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'MongoDB is great', content: 'You got that right!' });
    comment = new Comment({ content: 'Good job recognizing this fact!' });

    // Now lets manually associate them. Mongoose interprets pushing an entire object
    // with the correct ref type as just adding the object's id. Same goes for assigning directly
    // as is the case with the comment.author field because the type is ObjectId
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.author = joe;

    // Actually save these to the database, which we can do in parallel to save time!
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it('saves a relation between a user and their blog posts', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts') // Populates blogPosts field as actual objects instead of ObjectId vals
      .then((user) => {
        assert(user.blogPosts[0].title === 'MongoDB is great');
        done();
      });
  });

  it.only('saves a full relation tree (user -> blogPosts -> comments -> authors', (done) => {
    User.findOne({ name: 'Joe' })
      // We can pass populate an object which defines which properties to trace down
      // Each time we go down one layer, we need to also define the Schema (normal casing)
      // Also mind the pluralizing for arrays, vs non-plural for single fields
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'author',
            model: 'User',
          },
        },
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'MongoDB is great');
        assert(user.blogPosts[0].comments[0].content === 'Good job recognizing this fact!');
        assert(user.blogPosts[0].comments[0].author.name === 'Joe');
        done();
      });
  });
});
