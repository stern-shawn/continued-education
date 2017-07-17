require('dotenv').config();
const express = require('express');
// const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const expressValidator = require('express-validator');

// DB setup
mongoose.connect(process.env.MLAB);

// App setup
const app = express();
app.use(morgan('combined'));  // Logging middleware
app.use(cors()); // cors middleware, allows requests from other domains
app.use(bodyParser.json({ type: '*/*' }));  // Parse incoming requests into JSON
app.use(expressValidator()); // Append a number of helpful validation methods to the req object

router(app);

// // Server setup
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
