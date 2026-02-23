import React, { useCallback, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';
import Loader from '../components/ui/Loader';
import PageHeader from '../components/layout/PageHeader';
import CtaBanner from '../components/ui/CtaBanner';
import { fetchCaseStudies } from '../services/caseStudyService';

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CaseStudyCard = ({ study }) => {
  const [open, setOpen] = useState(false);

  const hasDetails =
    (study.phases && study.phases.length > 0) ||
    (study.techStack && study.techStack.length > 0) ||
    study.architectureSnapshot;

  return (
    <div className="case-study">
      {/* Always-visible header */}
      <div className="case-study__header">
        <div>
          <div className="case-study__industry">{study.industry}</div>
          <h3>{study.title}</h3>
          <p className="text-secondary" style={{ maxWidth: '560px' }}>
            {study.subtitle}
          </p>
          {study.timeline && (
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>Timeline:</strong> {study.timeline}
            </p>
          )}
        </div>
        <div className="case-study__metrics">
          {(study.headlineMetrics || []).map((metric, i) => (
            <div key={`${metric.value}-${i}`} className="case-study__metric-item">
              <span className="case-study__metric-value">{metric.value}</span>
              <span className="case-study__metric-desc">{metric.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expand / collapse toggle */}
      {hasDetails && (
        <button
          className={`case-study__toggle${open ? ' case-study__toggle--open' : ''}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          <ChevronIcon />
          {open ? 'Hide Details' : 'View Details'}
        </button>
      )}

      {/* Collapsible details */}
      {hasDetails && (
        <div className={`case-study__details${open ? ' case-study__details--open' : ''}`}>
          {study.architectureSnapshot && (
            <div style={{ padding: '0 3rem 1.5rem' }}>
              <div className="contact-form" style={{ padding: '1.25rem 1.5rem' }}>
                <p className="card__subheading">Architecture Snapshot</p>
                <p>{study.architectureSnapshot}</p>
              </div>
            </div>
          )}

          {(study.techStack || []).length > 0 && (
            <div style={{ padding: '0 3rem 1.5rem' }}>
              <div className="tech-list">
                {study.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(study.phases || []).length > 0 && (
            <div className="case-study__body">
              {study.phases.map((phase, i) => (
                <div key={`${phase.number}-${i}`} className="case-study__phase">
                  <div className="case-study__phase-label">
                    <span>{String(phase.number).padStart(2, '0')}</span>
                    {phase.label}
                  </div>
                  {phase.content && <p>{phase.content}</p>}
                  {Array.isArray(phase.items) && phase.items.length > 0 && (
                    <ul>
                      {phase.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CaseStudiesPage = () => {
  usePageMeta({
    title: 'Case Studies',
    description:
      'Real-world AI implementations with measurable impact across regulated, industrial, and operations-heavy domains.',
  });

  const fetchFn = useCallback(() => fetchCaseStudies(), []);
  const { data, loading } = useFetch(fetchFn);
  const [searchParams, setSearchParams] = useSearchParams();

  const caseStudies = data || [];
  const selectedIndustry = searchParams.get('industry') || 'All';

  useScrollReveal([loading, selectedIndustry]);

  const industries = useMemo(
    () => ['All', ...Array.from(new Set(caseStudies.map((item) => item.industry).filter(Boolean)))],
    [caseStudies]
  );

  const visibleCaseStudies = useMemo(() => {
    if (selectedIndustry === 'All') return caseStudies;
    return caseStudies.filter(
      (study) => study.industry.toLowerCase() === selectedIndustry.toLowerCase()
    );
  }, [caseStudies, selectedIndustry]);

  const onFilterClick = (industry) => {
    const params = new URLSearchParams(searchParams);
    if (industry === 'All') {
      params.delete('industry');
    } else {
      params.set('industry', industry);
    }
    setSearchParams(params);
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        label="Evidence"
        title="Architecture in Action"
        description="Real-world implementations demonstrating how full-stack AI architecture translates into measurable industrial impact."
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar reveal">
            {industries.map((industry) => (
              <button
                key={industry}
                type="button"
                className={`filter-chip${selectedIndustry === industry ? ' filter-chip--active' : ''}`}
                onClick={() => onFilterClick(industry)}
              >
                {industry}
              </button>
            ))}
          </div>

          {visibleCaseStudies.map((study, i) => (
            <div key={study._id || i} className="reveal">
              <CaseStudyCard study={study} />
            </div>
          ))}

          {visibleCaseStudies.length === 0 && (
            <div className="contact-form reveal">
              <h3>No case studies found for this filter yet.</h3>
              <p style={{ marginBottom: '1rem' }}>
                We can still share relevant references during a strategy session.
              </p>
              <Link to="/book-call" className="btn btn--primary">
                Book Strategy Call
              </Link>
            </div>
          )}
        </div>
      </section>

      <CtaBanner
        title="Your Industry Is Next"
        subtitle="Let's discuss how AARO7's architecture can deliver measurable impact for your organisation."
        buttonText="Schedule a Strategy Call"
      />
    </>
  );
};

export default CaseStudiesPage;
