import React from 'react';
import { Link } from 'react-router-dom';
import CounterMetric from './CounterMetric';

const HeroSection = ({ companyInfo }) => {
  const metrics = companyInfo?.heroMetrics || [
    { value: 50, suffix: '%+', label: 'Efficiency Gains' },
    { value: 33, suffix: '%+', label: 'Error Reduction' },
    { value: 60, suffix: '%', label: 'Faster Throughput' },
  ];

  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <div className="hero__label">{companyInfo?.companyName || 'AARO7 Fintech Pvt Ltd'}</div>
          <h1>
            We don't just prompt the future;<br />
            we <span className="highlight">architect</span> it.
          </h1>
          <p className="hero__subtitle">
            {companyInfo?.heroSubtitle ||
              'AARO7 is an end-to-end AI engineering hub that closes the gap between raw model potential and industrial execution.'}
          </p>
          <p className="hero__body">
            {companyInfo?.heroBody ||
              'We master the full AI stack - from foundational model fine-tuning to RAG architectures and agentic orchestration via MCP - building high-performance intelligence layers for any industry.'}
          </p>
          <div className="btn-group">
            <Link to="/book-call" className="btn btn--primary">
              Book Strategy Call
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/capabilities" className="btn btn--secondary">
              Explore Capabilities
            </Link>
          </div>
          <div className="hero__metrics">
            {metrics.map((m, i) => (
              <CounterMetric key={i} value={m.value} suffix={m.suffix} label={m.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
