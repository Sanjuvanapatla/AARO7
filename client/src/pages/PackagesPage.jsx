import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import CtaBanner from '../components/ui/CtaBanner';
import engagementPackages from '../data/engagementPackages';
import usePageMeta from '../hooks/usePageMeta';
import useScrollReveal from '../hooks/useScrollReveal';

const PackagesPage = () => {
  usePageMeta({
    title: 'Engagement Packages',
    description: 'Flexible engagement models from discovery to production-scale AI deployment and ongoing operations.',
  });
  useScrollReveal([]);

  return (
    <>
      <PageHeader
        label="Engagement Models"
        title="Offer Packages Built<br>For Execution"
        description="Choose an engagement track based on your current stage, urgency, and internal team capacity."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--2">
            {engagementPackages.map((item, index) => (
              <article key={item.id} className={`card reveal reveal-delay-${(index % 4) + 1}`}>
                <span className="label">Package</span>
                <h3>{item.name}</h3>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Duration:</strong> {item.duration}
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  <strong>Best For:</strong> {item.bestFor}
                </p>
                <ul className="card__list">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <Link to="/book-call" className="btn btn--secondary">
                  Discuss This Package
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need A Custom Engagement Structure?"
        subtitle="We can tailor scope, sequencing, and delivery model to your organization operating rhythm."
        buttonText="Talk With Architecture Team"
      />
    </>
  );
};

export default PackagesPage;
