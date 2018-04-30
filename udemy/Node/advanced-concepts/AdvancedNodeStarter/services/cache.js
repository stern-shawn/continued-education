const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

const client = redis.createClient(keys.redisUrl);
// Promisify the client.hget callback-based fn so it'll return a promise (can be async/awaited)
client.hget = util.promisify(client.hget);

// Save a copy of the original query exec fn
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || 'default');

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
  const cacheValue = await client.hget(this.hashKey, cacheKey);

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

  // Updating cache to expire values after 10s
  client.hset(this.hashKey, cacheKey, JSON.stringify(result), 'EX', 10);

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
}
