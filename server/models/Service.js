const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconSvg: { type: String, required: true },
  capabilities: [{ type: String }],
  metric: { type: String },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('Service', serviceSchema);
