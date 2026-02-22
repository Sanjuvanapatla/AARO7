import React from 'react';
import SectionHeader from '../ui/SectionHeader';

const WhyGrid = ({ differentiators }) => (
  <section className="section" id="why">
    <div className="container">
      <SectionHeader
        label="Why Partner"
        title="Why Partner with AARO7?"
        description="Domain-specific execution, adaptable architecture, and measurable outcomes with minimal disruption."
        center
      />
      <div className="why-grid">
        {differentiators.map((d, i) => (
          <div key={d._id || i} className={`why-item reveal reveal-delay-${i + 1}`}>
            <div className="why-item__number">{String(d.order).padStart(2, '0')}</div>
            <h4>{d.title}</h4>
            <p>{d.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyGrid;
