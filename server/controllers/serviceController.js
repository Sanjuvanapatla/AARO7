const asyncHandler = require('../middleware/asyncHandler');
const Service = require('../models/Service');

const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ order: 1 });
  res.json(services);
});

module.exports = { getServices };
