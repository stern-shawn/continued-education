const Artist = require('../models/artist');

/**
 * Sets a group of Artists as not retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */
module.exports = (_ids) =>
  // Trying out .updateMany instead of using .update with multi set to true
  Artist.updateMany(
    { _id: { $in: _ids } },
    { $set: { retired: false } },
  );

/*
According to mongoDB docs:
	.updateMany - Equivalent to db.collection.update( <query>, <update>, { multi: true, ... }) 
*/
