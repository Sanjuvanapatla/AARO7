const mongoose = require('mongoose');

const capabilityLayerSchema = new mongoose.Schema({
  layerNumber: { type: Number, required: true },
  sectionId: { type: String, required: true },
  title: { type: String, required: true },
  paragraphs: [{ type: String }],
  technologies: [{ type: String }],
  stages: [{
    label: { type: String },
    content: { type: String },
  }],
  agents: [{
    label: { type: String },
    content: { type: String },
  }],
  isReversed: { type: Boolean, default: false },
});

module.exports = mongoose.model('CapabilityLayer', capabilityLayerSchema);
