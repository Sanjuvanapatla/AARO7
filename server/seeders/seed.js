const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

const Service = require('../models/Service');
const Industry = require('../models/Industry');
const Differentiator = require('../models/Differentiator');
const CapabilityLayer = require('../models/CapabilityLayer');
const McpFeature = require('../models/McpFeature');
const CaseStudy = require('../models/CaseStudy');
const CompanyInfo = require('../models/CompanyInfo');

const services = require('./data/services.json');
const industries = require('./data/industries.json');
const differentiators = require('./data/differentiators.json');
const capabilities = require('./data/capabilities.json');
const mcpFeatures = require('./data/mcpFeatures.json');
const caseStudies = require('./data/caseStudies.json');
const companyInfo = require('./data/companyInfo.json');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await Promise.all([
      Service.deleteMany(),
      Industry.deleteMany(),
      Differentiator.deleteMany(),
      CapabilityLayer.deleteMany(),
      McpFeature.deleteMany(),
      CaseStudy.deleteMany(),
      CompanyInfo.deleteMany(),
    ]);
    console.log('Existing data cleared.');

    await Promise.all([
      Service.insertMany(services),
      Industry.insertMany(industries),
      Differentiator.insertMany(differentiators),
      CapabilityLayer.insertMany(capabilities),
      McpFeature.insertMany(mcpFeatures),
      CaseStudy.insertMany(caseStudies),
      CompanyInfo.create(companyInfo),
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
