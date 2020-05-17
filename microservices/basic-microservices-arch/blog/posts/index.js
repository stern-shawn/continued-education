const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const PORT = 4000;
const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post('http://localhost:4005/events', { type: 'PostCreated', data: posts[id] });

  res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
