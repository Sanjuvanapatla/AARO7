const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  iconSvg: { type: String, required: true },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Industry', industrySchema);
