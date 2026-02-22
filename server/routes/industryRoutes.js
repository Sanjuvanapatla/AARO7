const express = require('express');
const router = express.Router();
const { getIndustries } = require('../controllers/industryController');

router.get('/', getIndustries);

module.exports = router;
