const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String },
    email: { type: String, required: true },
    project: { type: String, required: true },
    readStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactSubmission', contactSubmissionSchema);
