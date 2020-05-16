const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 4002;
const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  console.log('Giving Posts');
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Event Received: ', JSON.stringify(req.body, null, 2));

  if (type === 'PostCreated') {
    console.log('PostCreated event');

    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    console.log('CommentCreated Event');

    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    console.log('CommentUpdated event, updating');
    const { id, postId, content, status } = data;

    const { comments } = posts[postId];
    const commentToUpdate = comments.find((c) => c.id === id);

    commentToUpdate.status = status;
    commentToUpdate.content = content;
  }

  console.log('Event Processed');
  console.log('posts: ', JSON.stringify(posts, null, 2));

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
