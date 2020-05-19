const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const PORT = 4002;
const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Modify posts cache depending on event type
const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    if (post) post.comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;

    const { comments } = posts[postId];
    const commentToUpdate = comments.find((c) => c.id === id);

    commentToUpdate.status = status;
    commentToUpdate.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  // Reach out to event bus for a history of all events while this service was down, and synchronize
  const { data: events } = await axios.get('http://event-bus-srv:4005/events');

  events.forEach(({ type, data }) => {
    console.log('Processing event: ', type);

    handleEvent(type, data);
  });
});
