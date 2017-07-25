const express = require('express');
const driversController = require('../controllers/driversController');

const router = express.Router();

router.post('/api/drivers', driversController.createDriver);
router.put('/api/drivers/:id', driversController.editDriver);
router.delete('/api/drivers/:id', driversController.deleteDriver);
router.get('/api/drivers/', driversController.indexDrivers);

module.exports = router;
