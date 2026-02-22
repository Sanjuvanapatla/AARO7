import React from 'react';

const VisionMission = ({ companyInfo }) => (
  <section className="section" id="mission">
    <div className="container">
      <div className="section-header reveal">
        <span className="label">Foundation</span>
        <h2>The Architecture Behind Our Purpose</h2>
      </div>
      <div className="vision-mission reveal">
        <div className="vision-mission__block">
          <h3>Our Vision</h3>
          <blockquote>
            "{companyInfo?.vision ||
              "To be the world's most versatile architecture for intelligence, mastering every layer of the AI stack to turn frontier technology into industrial reality."}"
          </blockquote>
        </div>
        <div className="vision-mission__block">
          <h3>Our Mission</h3>
          <blockquote>
            "{companyInfo?.mission ||
              'Our mission is to bridge the global AI Deployment Gap by mastering the full lifecycle of implementation. From training and fine-tuning foundational models to architecting RAG systems and orchestrating agentic ecosystems via MCP, we resolve technical debt and build the high-performance intelligence layer for any industry, in any domain.'}"
          </blockquote>
        </div>
      </div>
    </div>
  </section>
);

export default VisionMission;
