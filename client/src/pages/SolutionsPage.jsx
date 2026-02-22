import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import SectionHeader from '../components/ui/SectionHeader';
import CtaBanner from '../components/ui/CtaBanner';
import industrySolutions from '../data/industrySolutions';
import usePageMeta from '../hooks/usePageMeta';
import useScrollReveal from '../hooks/useScrollReveal';

const SolutionsPage = () => {
  usePageMeta({
    title: 'Industry Solutions',
    description:
      'Domain-specific AI solutions for fintech, automotive, healthcare, and manufacturing with measurable business outcomes.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'AARO7 Industry Solutions',
      itemListElement: industrySolutions.map((industry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: industry.name,
      })),
    },
  });
  useScrollReveal([]);

  return (
    <>
      <PageHeader
        label="Industry Solutions"
        title="AI Tailored For Your<br>Domain Reality"
        description="Each industry has unique constraints. We architect practical AI systems that align with your workflows, data patterns, and risk profile."
      />

      <section className="section">
        <div className="container">
          <SectionHeader
            label="By Industry"
            title="Deployment-Ready Blueprints"
            description="Explore how AARO7 translates full-stack AI capabilities into outcomes for each sector."
            center
          />

          <div className="grid grid--2">
            {industrySolutions.map((industry, index) => (
              <article key={industry.slug} className={`card reveal reveal-delay-${(index % 4) + 1}`}>
                <h3>{industry.name}</h3>
                <p>{industry.overview}</p>
                <p className="card__subheading">Common Pain Points</p>
                <ul className="card__list">
                  {industry.painPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="btn-group">
                  <Link className="btn btn--secondary" to={`/solutions/${industry.slug}`}>
                    View Solution Details
                  </Link>
                  <Link className="btn btn--ghost" to={`/case-studies?industry=${encodeURIComponent(industry.caseStudyIndustry)}`}>
                    Related Case Study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Need a Domain-Specific AI Plan?"
        subtitle="Schedule a working session to map your highest-value use case to an executable architecture."
        buttonText="Book Strategy Session"
      />
    </>
  );
};

export default SolutionsPage;
