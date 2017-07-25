const express = require('express');
const driversController = require('../controllers/driversController');

const router = express.Router();

router.get('/api', driversController.greeting);

module.exports = router;
