import React, { useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useScrollReveal from '../hooks/useScrollReveal';
import usePageMeta from '../hooks/usePageMeta';
import Loader from '../components/ui/Loader';
import PageHeader from '../components/layout/PageHeader';
import CtaBanner from '../components/ui/CtaBanner';
import { fetchCaseStudies } from '../services/caseStudyService';

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
      setSearchParams(params);
      return;
    }
    params.set('industry', industry);
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

          {visibleCaseStudies.map((study, studyIndex) => (
            <div key={study._id || studyIndex} className="case-study reveal">
              <div className="case-study__header">
                <div>
                  <div className="case-study__industry">{study.industry}</div>
                  <h3>{study.title}</h3>
                  <p className="text-secondary" style={{ maxWidth: '560px' }}>
                    {study.subtitle}
                  </p>
                  {study.timeline ? <p style={{ marginTop: '0.75rem' }}><strong>Timeline:</strong> {study.timeline}</p> : null}
                </div>
                <div className="case-study__metrics">
                  {(study.headlineMetrics || []).map((metric, metricIndex) => (
                    <div key={`${metric.value}-${metricIndex}`} className="case-study__metric-item">
                      <span className="case-study__metric-value">{metric.value}</span>
                      <span className="case-study__metric-desc">{metric.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {(study.techStack || []).length > 0 ? (
                <div style={{ padding: '0 3rem 2rem' }}>
                  <div className="tech-list">
                    {study.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {study.architectureSnapshot ? (
                <div className="contact-form" style={{ margin: '0 3rem 2rem', padding: '1.25rem 1.5rem' }}>
                  <p className="card__subheading">Architecture Snapshot</p>
                  <p>{study.architectureSnapshot}</p>
                </div>
              ) : null}

              <div className="case-study__body">
                {(study.phases || []).map((phase, phaseIndex) => (
                  <div key={`${phase.number}-${phaseIndex}`} className="case-study__phase">
                    <div className="case-study__phase-label">
                      <span>{String(phase.number).padStart(2, '0')}</span>
                      {phase.label}
                    </div>
                    {phase.content ? <p>{phase.content}</p> : null}
                    {Array.isArray(phase.items) && phase.items.length > 0 ? (
                      <ul>
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {visibleCaseStudies.length === 0 ? (
            <div className="contact-form reveal">
              <h3>No case studies found for this filter yet.</h3>
              <p style={{ marginBottom: '1rem' }}>We can still share relevant references during a strategy session.</p>
              <Link to="/book-call" className="btn btn--primary">
                Book Strategy Call
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <CtaBanner
        title="Your Industry Is Next"
        subtitle="Let's discuss how AARO7's architecture can deliver measurable impact for your organization."
        buttonText="Schedule a Strategy Call"
      />
    </>
  );
};

export default CaseStudiesPage;
