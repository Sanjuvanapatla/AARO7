import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import usePageMeta from '../hooks/usePageMeta';
import useScrollReveal from '../hooks/useScrollReveal';

const pillars = [
  {
    title: 'Security by Design',
    items: [
      'Environment-level access controls and least-privilege principles',
      'Encryption in transit and at rest across data workflows',
      'Deployment hardening with monitoring and alerting baselines',
    ],
  },
  {
    title: 'Governance and Auditability',
    items: [
      'Traceable model and workflow decisions with source attribution',
      'Change management with versioned rollouts and rollback safety',
      'Policy checkpoints for high-risk AI actions',
    ],
  },
  {
    title: 'Compliance Readiness',
    items: [
      'Documented controls aligned with domain requirements',
      'Configurable retention and data boundary enforcement',
      'Operational evidence to support internal and external reviews',
    ],
  },
  {
    title: 'Model Risk Management',
    items: [
      'Evaluation benchmarks for accuracy, latency, and hallucination risk',
      'Drift monitoring with retraining triggers',
      'Human-in-the-loop controls for critical decisions',
    ],
  },
];

const TrustCenterPage = () => {
  usePageMeta({
    title: 'Trust Center',
    description:
      'Understand AARO7 approach to enterprise AI security, governance, compliance readiness, and model risk management.',
  });
  useScrollReveal([]);

  return (
    <>
      <PageHeader
        label="Trust Center"
        title="Enterprise AI Trust<br>Built Into Architecture"
        description="Reliable AI adoption requires governance, security, and operational controls from day one. We build that foundation into every engagement."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className={`card reveal reveal-delay-${(index % 4) + 1}`}>
                <h3>{pillar.title}</h3>
                <ul className="card__list">
                  {pillar.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="contact-form reveal" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Need Security or Compliance Details?</h3>
            <p style={{ marginBottom: '1rem' }}>
              We can share architecture-level controls and implementation approach during a technical deep-dive.
            </p>
            <Link className="btn btn--primary" to="/book-call">
              Request Trust Deep-Dive
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustCenterPage;
