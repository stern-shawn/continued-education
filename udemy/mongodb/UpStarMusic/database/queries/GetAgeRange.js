const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  // .sort ascending + limiting to the first value is the performant way to find min
  const minQuery = Artist
    .find()
    .sort({ age: 1 })
    .limit(1) // Even with limit(1), result will still be an array, pluck out element 0
    .then((artists) => artists[0].age);

  // Same as min, just sort in descending order instead
  const maxQuery = Artist
    .find()
    .sort({ age: -1 })
    .limit(1)
    .then((artists) => artists[0].age);

  // API is expected to _return a promise_ that resolves to an object with min/max keys
  // Great time to use ES6 destructuring goodness because the instructor's code is gross
  return Promise.all([minQuery, maxQuery])
    .then(([min, max]) => ({ min, max }));
};
