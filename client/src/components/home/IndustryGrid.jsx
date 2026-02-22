import React from 'react';
import SectionHeader from '../ui/SectionHeader';

const IndustryGrid = ({ industries }) => (
  <section className="section" id="industries">
    <div className="container">
      <SectionHeader
        label="Domains"
        title="Industrial Intelligence Across Domains"
        description="Deploying AI architecture where it matters most — precision-engineered for sector-specific complexity."
        center
      />
      <div className="industries-grid">
        {industries.map((ind, i) => (
          <div key={ind._id || i} className={`industry-item reveal reveal-delay-${i + 1}`}>
            <div className="industry-item__icon" dangerouslySetInnerHTML={{ __html: ind.iconSvg }} />
            <h4>{ind.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IndustryGrid;
