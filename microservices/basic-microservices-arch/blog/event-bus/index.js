const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = 4005;

const app = express();
app.use(bodyParser.json());

// Create an event cache so services can replay history and re-sync if they go down and come online later
const events = [];

app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);

  axios.post('http://localhost:4000/events', event); // Posts
  axios.post('http://localhost:4001/events', event); // Comments
  axios.post('http://localhost:4002/events', event); // Query
  axios.post('http://localhost:4003/events', event); // Comment moderation

  res.send({ status: 'OK' });
});

// Expose event history to services for sync purposes
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
