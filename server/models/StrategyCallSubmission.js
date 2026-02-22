const mongoose = require('mongoose');

const strategyCallSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, trim: true },
    industry: { type: String, trim: true },
    teamSize: { type: String, trim: true },
    currentStage: { type: String, trim: true },
    primaryUseCase: { type: String, required: true, trim: true },
    timeline: { type: String, trim: true },
    budgetRange: { type: String, trim: true },
    dataReadiness: { type: String, trim: true },
    objectives: [{ type: String }],
    notes: { type: String, trim: true },
    preferredRegion: { type: String, trim: true },
    source: { type: String, default: 'website_strategy_funnel' },
    readStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StrategyCallSubmission', strategyCallSubmissionSchema);
