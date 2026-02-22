const asyncHandler = require('../middleware/asyncHandler');
const CompanyInfo = require('../models/CompanyInfo');
const Service = require('../models/Service');
const Industry = require('../models/Industry');
const Differentiator = require('../models/Differentiator');

const getHomeData = asyncHandler(async (req, res) => {
  const [companyInfo, services, industries, differentiators] = await Promise.all([
    CompanyInfo.findOne(),
    Service.find().sort({ order: 1 }),
    Industry.find().sort({ order: 1 }),
    Differentiator.find().sort({ order: 1 }),
  ]);
  res.json({ companyInfo, services, industries, differentiators });
});

module.exports = { getHomeData };
