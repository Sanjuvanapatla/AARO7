const express = require('express');
const router = express.Router();
const { getDifferentiators } = require('../controllers/differentiatorController');

router.get('/', getDifferentiators);

module.exports = router;
