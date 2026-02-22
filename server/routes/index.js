const express = require('express');
const router = express.Router();

router.use('/home', require('./homeRoutes'));
router.use('/services', require('./serviceRoutes'));
router.use('/industries', require('./industryRoutes'));
router.use('/differentiators', require('./differentiatorRoutes'));
router.use('/capabilities', require('./capabilityRoutes'));
router.use('/mcp-features', require('./mcpFeatureRoutes'));
router.use('/case-studies', require('./caseStudyRoutes'));
router.use('/company-info', require('./companyInfoRoutes'));
router.use('/contact', require('./contactRoutes'));
router.use('/readiness-assessments', require('./readinessAssessmentRoutes'));
router.use('/strategy-calls', require('./strategyCallRoutes'));
router.use('/analytics', require('./analyticsRoutes'));
router.use('/assistant', require('./assistantRoutes'));

module.exports = router;
