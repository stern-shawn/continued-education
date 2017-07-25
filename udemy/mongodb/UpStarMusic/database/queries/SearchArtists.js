const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist.find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([query, Artist.count()])
    .then(([all, count]) => ({ all, count, offset, limit }));
};

// Programmatically build up the query object depending on what criteria are povided in the request
const buildQuery = (criteria) => {
  const query = {};

  // Only filter by name if one is provided
  if (criteria.name) {
    // We'll need to do a { $text: { $search: search-value } } query, requiring us to index names
    query.$text = {
      $search: criteria.name,
    };
  }

  // Age might not provided, so only include it in the query if it exists
  if (criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max,
    };
  }

  // Same for years active
  if (criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max,
    };
  }

  return query;
};
