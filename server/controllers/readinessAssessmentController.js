const asyncHandler = require('../middleware/asyncHandler');
const ReadinessAssessment = require('../models/ReadinessAssessment');
const { pushLeadToCrm } = require('../utils/crmWebhook');

const submitReadinessAssessment = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    company,
    role,
    industry,
    score,
    maxScore,
    percentage,
    maturityLevel,
    recommendations,
    answers,
    source,
  } = req.body;

  if (!name || !email || typeof score !== 'number' || typeof maxScore !== 'number' || !maturityLevel) {
    res.status(400);
    throw new Error('Missing required readiness assessment fields');
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    res.status(400);
    throw new Error('At least one answered question is required');
  }

  const submission = await ReadinessAssessment.create({
    name,
    email,
    company,
    role,
    industry,
    score,
    maxScore,
    percentage,
    maturityLevel,
    recommendations: Array.isArray(recommendations) ? recommendations : [],
    answers,
    source: source || 'website_assessment',
  });

  pushLeadToCrm('readiness_assessment_submission', submission.toObject());

  res.status(201).json(submission);
});

const getReadinessAssessments = asyncHandler(async (req, res) => {
  const submissions = await ReadinessAssessment.find().sort({ createdAt: -1 });
  res.json(submissions);
});

module.exports = { submitReadinessAssessment, getReadinessAssessments };
