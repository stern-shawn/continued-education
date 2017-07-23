require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGODB}/users_test`);
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', warning => console.warn(`Warning: ${warning}`));
