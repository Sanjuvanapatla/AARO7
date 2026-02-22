const asyncHandler = require('../middleware/asyncHandler');
const Differentiator = require('../models/Differentiator');

const getDifferentiators = asyncHandler(async (req, res) => {
  const differentiators = await Differentiator.find().sort({ order: 1 });
  res.json(differentiators);
});

module.exports = { getDifferentiators };
