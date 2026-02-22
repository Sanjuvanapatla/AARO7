const express = require('express');
const router = express.Router();
const { getCaseStudies } = require('../controllers/caseStudyController');

router.get('/', getCaseStudies);

module.exports = router;
