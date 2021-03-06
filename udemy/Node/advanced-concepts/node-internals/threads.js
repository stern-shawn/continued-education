process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');

// Note that start is exactly the same between all calls to crypto, all calls are operating in parallel
const start = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start);
});

// If Node was fully single-threaded and each call takes ~800ms on this machine,
// if both happened in sequence in a single thread, total op time should be 1600ms.
// Instead, both operations execute in ~800ms with a slight duration difference as one was launched
// just slightly before the other

// This is because pbkdf2 when run on Node's C++ side is passed to libuv, which does the operations
// in a `Thread Pool` of 4 threads that can handle expensive calculations

// Timeline
// -------------------------------
// 1  2  3  4  5
// |  |  |  |  |
// x  x  x  x  |
//             x
// Because there are only 4 threads, we (relatively) reliable see the first 4 operations complete
// around the same time, but the 5th has to wait until a thread is free before it can execute!
//
// Example Output from running `node threads.js`
// 2: 918
// 1: 946
// 3: 966
// 4: 966
// 5: 1757
//
// When we update the threadpool size to be only 2, notice that operations complete in chunks of 2
// 1: 836
// 2: 853
// 3: 1674
// 4: 1704
// 5: 2506
//
// When we change threadpool size to 5, things get interesting because then the OS scheduler splits
// core processing availability between all threads evenly
// 5: 1036
// 4: 1038
// 3: 1080
// 2: 1357
// 1: 1358
