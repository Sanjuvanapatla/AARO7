import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import CtaBanner from '../components/ui/CtaBanner';
import industrySolutions from '../data/industrySolutions';
import usePageMeta from '../hooks/usePageMeta';
import useScrollReveal from '../hooks/useScrollReveal';

const SolutionDetailPage = () => {
  const { slug } = useParams();
  const industry = industrySolutions.find((item) => item.slug === slug);

  usePageMeta({
    title: industry ? `${industry.name} AI Solutions` : 'Industry Solutions',
    description: industry
      ? `How AARO7 delivers measurable AI outcomes for ${industry.name.toLowerCase()} teams.`
      : 'Domain-specific AI solutions by AARO7.',
  });
  useScrollReveal([]);

  if (!industry) {
    return <Navigate to="/solutions" replace />;
  }

  return (
    <>
      <PageHeader
        label={industry.name}
        title={`${industry.name} AI<br>Solution Blueprint`}
        description={industry.overview}
      />

      <section className="section">
        <div className="container">
          <div className="capability-section reveal">
            <div className="capability-content">
              <span className="label">Pain Points</span>
              <h3>Operational Friction We Target</h3>
              <ul className="card__list">
                {industry.painPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="capability-visual">
              <div className="arch-diagram">
                <div className="arch-layer">
                  <span className="arch-layer__label">Input</span>
                  <span className="arch-layer__content">Existing systems, data sources, domain constraints</span>
                </div>
                <div className="arch-connector"></div>
                <div className="arch-layer">
                  <span className="arch-layer__label">Design</span>
                  <span className="arch-layer__content">{industry.serviceFocus.join(' + ')}</span>
                </div>
                <div className="arch-connector"></div>
                <div className="arch-layer">
                  <span className="arch-layer__label">Outcome</span>
                  <span className="arch-layer__content">{industry.outcomes[0]}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="capability-section capability-section--reverse reveal">
            <div className="capability-content">
              <span className="label">Expected Outcomes</span>
              <h3>What Better Looks Like</h3>
              <ul className="card__list">
                {industry.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="tech-list">
                {industry.serviceFocus.map((focus) => (
                  <span key={focus} className="tech-tag">
                    {focus}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <Link className="btn btn--secondary" to={`/case-studies?industry=${encodeURIComponent(industry.caseStudyIndustry)}`}>
                  View Related Case Study
                </Link>
              </div>
            </div>
            <div className={`capability-visual capability-visual--${industry.slug}`}>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)', position: 'relative', zIndex: 2 }}>
                We adapt model, retrieval, and workflow architecture to {industry.name.toLowerCase()} context so your teams
                can deploy confidently with measurable operational gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title={`Ready To Deploy AI In ${industry.name}?`}
        subtitle="Book a structured strategy call and we will map your first deployment track."
        buttonText="Book Strategy Call"
      />
    </>
  );
};

export default SolutionDetailPage;
