const express = require('express');
const router = express.Router();
const { getFunnelAnalytics } = require('../controllers/analyticsController');

router.get('/funnel', getFunnelAnalytics);

module.exports = router;
