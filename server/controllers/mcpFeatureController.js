const asyncHandler = require('../middleware/asyncHandler');
const McpFeature = require('../models/McpFeature');

const getMcpFeatures = asyncHandler(async (req, res) => {
  const features = await McpFeature.find().sort({ order: 1 });
  res.json(features);
});

module.exports = { getMcpFeatures };
