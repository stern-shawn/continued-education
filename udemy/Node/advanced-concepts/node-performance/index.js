// Every CHILD will be restricted to one thread
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require('cluster');
const crypto = require('crypto');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const express = require('express');
  const app = express();


  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('That was fast!');
  });

  app.listen(3000);
}
