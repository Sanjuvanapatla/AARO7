const express = require('express');
const router = express.Router();
const { getCompanyInfo } = require('../controllers/companyInfoController');

router.get('/', getCompanyInfo);

module.exports = router;
