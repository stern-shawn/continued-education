Node is a Javascript layer that leverages both the Google V8 project and libuv.

When our Javascript is executed by Node.js and we use a library function, such as a crypto package,
Node is using Javascript to run validation on our inputs, and then uses features like
process.binding() to send the arguments to the C++ implementation of the code through V8
while using libuv for filesystem access and some concurrency features.
