const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  // .sort ascending + limiting to the first value is the performant way to find min
  const minQuery = Artist
    .find()
    .sort({ yearsActive: 1 })
    .limit(1)
    .then((artists) => artists[0].yearsActive);

  // Same as min, just sort in descending order instead
  const maxQuery = Artist
    .find()
    .sort({ yearsActive: -1 })
    .limit(1)
    .then((artists) => artists[0].yearsActive);

  // API is expected to _return a promise_ that resolves to an object with min/max keys
  // Great time to use ES6 destructuring goodness because the instructor's code is gross
  return Promise.all([minQuery, maxQuery])
    .then(([min, max]) => ({ min, max }));
};
