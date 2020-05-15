const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

const PORT = 4001;
const commentsByPostId = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const { id: postId } = req.params;

  const newComment = { id: commentId, content };

  commentsByPostId[postId] = commentsByPostId[postId] ? [...commentsByPostId[postId], newComment] : [newComment];

  res.status(201).send(commentsByPostId[postId]);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
