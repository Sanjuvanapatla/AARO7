const express = require('express');
const router = express.Router();
const { submitStrategyCall, getStrategyCalls } = require('../controllers/strategyCallController');

router.route('/').post(submitStrategyCall).get(getStrategyCalls);

module.exports = router;
