const express = require('express');
const driversController = require('../controllers/driversController');

const router = express.Router();

router.get('/api', driversController.greeting);

router.post('/api/drivers', driversController.createDriver);
router.put('/api/drivers/:id', driversController.editDriver);

module.exports = router;
