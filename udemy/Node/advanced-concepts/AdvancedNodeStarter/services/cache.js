const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
// Promisify the client.get callback-based fn so it'll return a promise (can be async/awaited)
client.get = util.promisify(client.get);

// Save a copy of the original query exec fn
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function() {
  this.useCache = true;
  // Make sure to return this so the fn is chainable
  return this;
}

// Hijack the definition of mongoose exec, preform caching ops, and execute as normal if no cache found
mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const cacheKey = JSON.stringify({
    // getQuery returns the query options, unique to each query!
    ...this.getQuery(),
    // also specify by which collection is being queried, such as Blogs, Users, etc
    collection: this.mongooseCollection.name,
  });

  // Check if value already cached in redis
  const cacheValue = await client.get(cacheKey);

  // If cached, return that value and skip query execution/transaction
  if (cacheValue) {
    const document = JSON.parse(cacheValue);

    // If we get back a collection of values instead of just one, correctly 'hydrate' that array into mongoose documents
    return Array.isArray(document)
      ? document.map(d => new this.model(d))
      : new this.model(document);
  }

  // Otherwise, execute the query, cache in redis, and return to user
  const result = await exec.apply(this, arguments);
  client.set(cacheKey, JSON.stringify(result));

  return result;
};
