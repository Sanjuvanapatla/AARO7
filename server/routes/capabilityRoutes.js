const express = require('express');
const router = express.Router();
const { getCapabilities } = require('../controllers/capabilityController');

router.get('/', getCapabilities);

module.exports = router;
