const mongoose = require('mongoose');

const readinessAnswerSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    prompt: { type: String, required: true },
    answer: { type: String, required: true },
    weight: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
  },
  { _id: false }
);

const readinessAssessmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, trim: true },
    role: { type: String, trim: true },
    industry: { type: String, trim: true },
    score: { type: Number, required: true, min: 0 },
    maxScore: { type: Number, required: true, min: 1 },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    maturityLevel: {
      type: String,
      enum: ['Early', 'Developing', 'Advanced', 'Leader'],
      required: true,
    },
    recommendations: [{ type: String }],
    answers: [readinessAnswerSchema],
    source: { type: String, default: 'website_assessment' },
    readStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReadinessAssessment', readinessAssessmentSchema);
