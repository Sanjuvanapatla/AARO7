const express = require('express');
const router = express.Router();
const {
  submitReadinessAssessment,
  getReadinessAssessments,
} = require('../controllers/readinessAssessmentController');

router.route('/').post(submitReadinessAssessment).get(getReadinessAssessments);

module.exports = router;
