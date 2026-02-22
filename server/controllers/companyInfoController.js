const asyncHandler = require('../middleware/asyncHandler');
const CompanyInfo = require('../models/CompanyInfo');

const getCompanyInfo = asyncHandler(async (req, res) => {
  const info = await CompanyInfo.findOne();
  res.json(info);
});

module.exports = { getCompanyInfo };
