const asyncHandler = require('../middleware/asyncHandler');
const StrategyCallSubmission = require('../models/StrategyCallSubmission');
const { pushLeadToCrm } = require('../utils/crmWebhook');

const submitStrategyCall = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    company,
    role,
    industry,
    teamSize,
    currentStage,
    primaryUseCase,
    timeline,
    budgetRange,
    dataReadiness,
    objectives,
    notes,
    preferredRegion,
    source,
  } = req.body;

  if (!name || !email || !company || !primaryUseCase) {
    res.status(400);
    throw new Error('Please complete required strategy call fields');
  }

  const submission = await StrategyCallSubmission.create({
    name,
    email,
    company,
    role,
    industry,
    teamSize,
    currentStage,
    primaryUseCase,
    timeline,
    budgetRange,
    dataReadiness,
    objectives: Array.isArray(objectives) ? objectives : [],
    notes,
    preferredRegion,
    source: source || 'website_strategy_funnel',
  });

  pushLeadToCrm('strategy_call_submission', submission.toObject());

  res.status(201).json(submission);
});

const getStrategyCalls = asyncHandler(async (req, res) => {
  const submissions = await StrategyCallSubmission.find().sort({ createdAt: -1 });
  res.json(submissions);
});

module.exports = { submitStrategyCall, getStrategyCalls };
