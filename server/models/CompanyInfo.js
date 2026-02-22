const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  tagline: { type: String },
  vision: { type: String },
  mission: { type: String },
  email: { type: String },
  headquarters: { type: String },
  responseTime: { type: String },
  footerDescription: { type: String },
  heroSubtitle: { type: String },
  heroBody: { type: String },
  heroMetrics: [{
    value: { type: Number },
    suffix: { type: String },
    label: { type: String },
  }],
  copyrightYear: { type: Number },
});

module.exports = mongoose.model('CompanyInfo', companyInfoSchema);
