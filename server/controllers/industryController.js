const asyncHandler = require('../middleware/asyncHandler');
const Industry = require('../models/Industry');

const getIndustries = asyncHandler(async (req, res) => {
  const industries = await Industry.find().sort({ order: 1 });
  res.json(industries);
});

module.exports = { getIndustries };
