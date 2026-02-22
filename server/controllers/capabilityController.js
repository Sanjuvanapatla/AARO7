const asyncHandler = require('../middleware/asyncHandler');
const CapabilityLayer = require('../models/CapabilityLayer');

const getCapabilities = asyncHandler(async (req, res) => {
  const capabilities = await CapabilityLayer.find().sort({ layerNumber: 1 });
  res.json(capabilities);
});

module.exports = { getCapabilities };
