const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = 4005;

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;
  console.log('Event Received: ', JSON.stringify(req.body, null, 2));
  console.log('Emitting Event to services');

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  // axios.post('http://localhost:4002/events', event);

  res.send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
