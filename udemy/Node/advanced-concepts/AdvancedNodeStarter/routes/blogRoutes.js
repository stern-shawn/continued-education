const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    const redis = require('redis');
    const util = require('util');
    const redisUrl = 'redis://127.0.0.1:6379';
    const client = redis.createClient(redisUrl);
    // Promisify the client.get callback-based fn so it'll return a promise (can be async/awaited)
    client.get = util.promisify(client.get);

    // Check for redis-cached data for this request
    const cachedBlogs = await client.get(req.user.id);

    // If yes, get immediately from redis and return
    if (cachedBlogs) {
      console.log('SERVING CACHED VALUE');
      // redis only stores strings and numbers, so to return the actual object, we'll need to parse from JSON first
      return res.send(JSON.parse(cachedBlogs));
    }
    // If no, reach out to mongo, get data, return to user and add to cache to speed up subsequent calls

    const blogs = await Blog.find({ _user: req.user.id });

    console.log('SERVING FROM MONGODB');
    // redis only stores strings and numbers, so to store the object we'll need to stringify it first
    client.set(req.user.id, JSON.stringify(blogs));
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
