const mongoose = require('mongoose');

const differentiatorSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Differentiator', differentiatorSchema);
