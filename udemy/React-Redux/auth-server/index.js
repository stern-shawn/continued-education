const express = require('express');
// const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

// DB setup
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
const app = express();
app.use(morgan('combined'));  // Logging middleware
app.use(bodyParser.json({ type: '*/*' }));  // Parse incoming requests into JSON
router(app);

// // Server setup
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
