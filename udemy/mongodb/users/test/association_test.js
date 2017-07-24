const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/User.js');
const Comment = require('../src/Comment.js');
const BlogPost = require('../src/BlogPost.js');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    // Separately initialize all of our basic collections...
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'MongoDB is great', content: 'You got that right!' });
    comment = new Comment({ content: 'Good job recognizing this fact!' });

    // Now lets manually associate them. Mongoose interprets pushing an entire object
    // with the correct ref type as just adding the object's id. Same goes for assigning directly
    // as is the case with the comment.author field because the type is ObjectId
    joe.blogPosts.push(blogPost);
    blogPost.coments.push(comment);
    comment.author = joe;

    // Actually save these to the database, which we can do in parallel to save time!
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });
});
