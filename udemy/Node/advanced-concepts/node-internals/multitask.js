// process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');
const https = require('https');
const fs = require('fs');

const start = Date.now();

function doRequest() {
  https.request('https://www.google.com', (res) => {
    res.on('data', () => {})
    res.on('end', () => {
      console.log('Network Request:', Date.now() - start);
    })
  })
  .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start);
  });
}

doRequest();

fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
})

doHash();
doHash();
doHash();
doHash();

// Timeline
// ----------------------------------
// http readFile hash hash hash hash
//  |       |     |    |    | 
//  x       |     |    |    |    |
//          |     |    |    |    |
//          |     |    |    |    |
//          |     x    |    |    |
//          x          x    x    x
// In this scenario, http operates on its own and finishes early
// Once the readFile call submits the request for data from the hard drive, the thread is released while it waits for a
// response. Once released, the scheduler assigns it to work on the 4th hash call which hasn't been started yet.
// One of the first three hash calls finishes, which then frees up a thread, which then picks up the readFile call, gets
// back the file data, and works as normal because there are no other pending ops to take the thread away.
// This is why we always see one hash call finish before the fs does, and why the http request always finishes first
// even though reading from the filesystem should be way faster
// If we take out one hash call so that there are only 4 threadable tasks, we see that the read file call is the fastest
