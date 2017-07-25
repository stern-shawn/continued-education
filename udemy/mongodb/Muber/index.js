// Register our schemas
require('./models/Driver');

const app = require('./app');

app.listen(3000, () => {
  console.log('Running on port 3000');
});
