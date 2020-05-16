const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const PORT = 4001;
const commentsByPostId = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id: postId } = req.params;

  const newComment = { id: commentId, content };

  commentsByPostId[postId] = commentsByPostId[postId] ? [...commentsByPostId[postId], newComment] : [newComment];

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: { id: commentId, content, postId },
  });

  res.status(201).send(commentsByPostId[postId]);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Event Received: ', JSON.stringify(req.body, null, 2));

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
