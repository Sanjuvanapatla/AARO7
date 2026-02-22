const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  industry: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  timeline: { type: String },
  architectureSnapshot: { type: String },
  techStack: [{ type: String }],
  headlineMetrics: [{
    value: { type: String },
    description: { type: String },
  }],
  phases: [{
    number: { type: Number },
    label: { type: String },
    content: { type: String },
    items: [{ type: String }],
  }],
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model('CaseStudy', caseStudySchema);
