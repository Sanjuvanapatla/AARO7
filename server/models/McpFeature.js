const mongoose = require('mongoose');

const mcpFeatureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  iconSvg: { type: String, required: true },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('McpFeature', mcpFeatureSchema);
