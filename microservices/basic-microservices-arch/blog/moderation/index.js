const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = 4003;
const posts = {};

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  console.log('Event Received: ', JSON.stringify(req.body, null, 2));

  if (type === 'CommentCreated') {
    console.log('CommentCreated event, moderating');
    const { id, content, postId } = data;
    const status = content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id,
        postId,
        content,
        status,
      },
    });
  }

  console.log('Event Processed');

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
