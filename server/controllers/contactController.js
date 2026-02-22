const asyncHandler = require('../middleware/asyncHandler');
const ContactSubmission = require('../models/ContactSubmission');
const { pushLeadToCrm } = require('../utils/crmWebhook');

const submitContact = asyncHandler(async (req, res) => {
  const { name, company, role, email, project } = req.body;

  if (!name || !company || !email || !project) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  const submission = await ContactSubmission.create({
    name,
    company,
    role,
    email,
    project,
  });

  // Non-blocking CRM sync when webhook is configured.
  pushLeadToCrm('contact_submission', submission.toObject());

  res.status(201).json(submission);
});

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactSubmission.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = { submitContact, getContacts };
