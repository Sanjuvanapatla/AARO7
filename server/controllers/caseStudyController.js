const asyncHandler = require('../middleware/asyncHandler');
const CaseStudy = require('../models/CaseStudy');

const getCaseStudies = asyncHandler(async (req, res) => {
  const caseStudies = await CaseStudy.find().sort({ order: 1 });
  res.json(caseStudies);
});

module.exports = { getCaseStudies };
