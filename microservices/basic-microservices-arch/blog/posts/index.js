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

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post(`http://event-bus-srv:4005/events`, { type: 'PostCreated', data: posts[id] });

  res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  res.send({});
});

app.listen(PORT, () => {
  console.log('v3, testing k8s deployments with rollouts/restart');
  console.log(`Listening on port ${PORT}`);
});
