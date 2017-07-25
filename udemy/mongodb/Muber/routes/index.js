const express = require('express');
const driversController = require('../controllers/driversController');

const router = express.Router();

router.get('/api', driversController.greeting);

router.post('/api/drivers', driversController.createDriver);

module.exports = router;
