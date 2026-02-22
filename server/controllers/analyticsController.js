const asyncHandler = require('../middleware/asyncHandler');
const ContactSubmission = require('../models/ContactSubmission');
const ReadinessAssessment = require('../models/ReadinessAssessment');
const StrategyCallSubmission = require('../models/StrategyCallSubmission');

const getFunnelAnalytics = asyncHandler(async (req, res) => {
  const now = new Date();
  const last30 = new Date(now);
  last30.setDate(last30.getDate() - 30);

  const [contacts, readinessAssessments, strategyCalls] = await Promise.all([
    ContactSubmission.countDocuments(),
    ReadinessAssessment.countDocuments(),
    StrategyCallSubmission.countDocuments(),
  ]);

  const [contacts30, readiness30, strategy30] = await Promise.all([
    ContactSubmission.countDocuments({ createdAt: { $gte: last30 } }),
    ReadinessAssessment.countDocuments({ createdAt: { $gte: last30 } }),
    StrategyCallSubmission.countDocuments({ createdAt: { $gte: last30 } }),
  ]);

  const qualifiedLeads = contacts + readinessAssessments;
  const leadToMeetingRate = qualifiedLeads > 0 ? (strategyCalls / qualifiedLeads) * 100 : 0;
  const engagementTouchpoints = contacts + readinessAssessments + strategyCalls;

  res.json({
    totals: {
      contactLeads: contacts,
      readinessLeads: readinessAssessments,
      qualifiedLeads,
      strategyCalls,
      engagementTouchpoints,
      leadToMeetingRate: Number(leadToMeetingRate.toFixed(2)),
    },
    last30Days: {
      contactLeads: contacts30,
      readinessLeads: readiness30,
      strategyCalls: strategy30,
    },
    updatedAt: now.toISOString(),
  });
});

module.exports = { getFunnelAnalytics };
