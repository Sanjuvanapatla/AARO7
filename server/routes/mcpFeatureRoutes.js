const express = require('express');
const router = express.Router();
const { getMcpFeatures } = require('../controllers/mcpFeatureController');

router.get('/', getMcpFeatures);

module.exports = router;
