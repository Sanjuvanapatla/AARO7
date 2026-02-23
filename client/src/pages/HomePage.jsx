import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useScrollReveal from '../hooks/useScrollReveal';
import useCounter from '../hooks/useCounter';
import Loader from '../components/ui/Loader';
import SectionHeader from '../components/ui/SectionHeader';
import CtaBanner from '../components/ui/CtaBanner';
import TabPanel from '../components/ui/TabPanel';
import HeroSection from '../components/home/HeroSection';
import ServiceCard from '../components/home/ServiceCard';
import { fetchHomeData } from '../services/homeService';
import usePageMeta from '../hooks/usePageMeta';

const HomePage = () => {
  usePageMeta({
    title: 'AI Engineering Hub',
    description:
      'AARO7 builds custom AI models, smart retrieval systems, and workflow automation for enterprise outcomes.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AARO7 Fintech Pvt Ltd',
      url: 'https://aaro7.com',
      sameAs: [],
    },
  });

  const fetchFn = useCallback(() => fetchHomeData(), []);
  const { data, loading } = useFetch(fetchFn);

  useScrollReveal([loading]);
  useCounter([loading]);

  if (loading) return <Loader />;

  const { companyInfo, services, industries, differentiators } = data || {};

  /* ── Vision / Mission tabs ── */
  const visionMissionTabs = [
    {
      label: 'Our Vision',
      icon: '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="7"/><circle cx="10" cy="10" r="3"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="10" y1="16" x2="10" y2="19"/><line x1="1" y1="10" x2="4" y2="10"/><line x1="16" y1="10" x2="19" y2="10"/></svg>',
      content: (
        <blockquote className="vm-quote">
          "{companyInfo?.vision ||
            "To be the world's most versatile architecture for intelligence, mastering every layer of the AI stack to turn frontier technology into industrial reality."}"
        </blockquote>
      ),
    },
    {
      label: 'Our Mission',
      icon: '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 17V5a2 2 0 012-2h10a2 2 0 012 2v12l-7-3-7 3z"/></svg>',
      content: (
        <blockquote className="vm-quote">
          "{companyInfo?.mission ||
            'Our mission is to bridge the global AI Deployment Gap by mastering the full lifecycle of implementation. From training and fine-tuning foundational models to architecting RAG systems and orchestrating agentic ecosystems via MCP, we resolve technical debt and build the high-performance intelligence layer for any industry, in any domain.'}"
        </blockquote>
      ),
    },
  ];

  /* ── Service tabs ── */
  const serviceTabs = (services || []).map((s, i) => ({
    label: s.title,
    icon: s.iconSvg,
    content: <ServiceCard key={s._id || i} service={s} delay={0} layout="horizontal" />,
  }));

  /* ── Growth tools data ── */
  const growthTools = [
    { title: 'AI Readiness Assessment', desc: 'Score your deployment readiness and get prioritized next steps.', to: '/assessment', cta: 'Start Assessment', icon: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2v16M2 10h16"/><circle cx="10" cy="10" r="8"/></svg>' },
    { title: 'ROI Calculator', desc: 'Estimate annual value, savings, and payback period.', to: '/roi-calculator', cta: 'Calculate ROI', icon: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="16" height="14" rx="2"/><line x1="6" y1="8" x2="14" y2="8"/><line x1="6" y1="12" x2="14" y2="12"/></svg>' },
    { title: 'Packages', desc: 'Delivery models aligned to your maturity and urgency.', to: '/packages', cta: 'View Packages', icon: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6l8-4 8 4-8 4-8-4z"/><path d="M2 10l8 4 8-4"/><path d="M2 14l8 4 8-4"/></svg>' },
    { title: 'Trust Center', desc: 'Security, governance, and model risk practices.', to: '/trust-center', cta: 'Explore', icon: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V5l7-3z"/><path d="M7 10l2 2 4-4"/></svg>' },
  ];

  return (
    <>
      <HeroSection companyInfo={companyInfo} />

      {/* ── Vision & Mission — Tabbed ── */}
      <section className="section section--compact" id="mission">
        <div className="container">
          <div className="vm-row reveal">
            <div className="vm-header">
              <span className="label">Foundation</span>
              <h2>The Architecture Behind Our Purpose</h2>
            </div>
            <div className="vm-tabs-wrapper">
              <TabPanel tabs={visionMissionTabs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services — Tabbed Horizontal ── */}
      {serviceTabs.length > 0 && (
        <section className="section section--compact" id="services">
          <div className="container">
            <SectionHeader
              label="Services & Capabilities"
              title="AI Built For Real-World Business Outcomes"
              description="Custom AI solutions across fintech, automotive, healthcare, manufacturing, and beyond — built around three pillars."
            />
            <div className="services-tab-wrapper reveal">
              <TabPanel tabs={serviceTabs} className="services-tabs" />
            </div>
            <div className="services-actions reveal">
              <Link to="/book-call" className="btn btn--primary">
                Book Strategy Call
              </Link>
              <Link to="/case-studies" className="btn btn--secondary">
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Growth Tools + Content Engine — Horizontal Strip ── */}
      <section className="section section--compact" id="growth-tools">
        <div className="container">
          <SectionHeader
            label="Growth Tools"
            title="Conversion Paths For Every Buyer Stage"
          />
          <div className="tools-strip reveal">
            {growthTools.map((tool, i) => (
              <Link to={tool.to} key={i} className="tool-card">
                <div className="tool-card__icon" dangerouslySetInnerHTML={{ __html: tool.icon }} />
                <div className="tool-card__body">
                  <h4>{tool.title}</h4>
                  <p>{tool.desc}</p>
                </div>
                <span className="tool-card__arrow">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </Link>
            ))}
          </div>
          <div className="content-engine-inline reveal">
            <div className="content-engine-inline__text">
              <span className="label">Content Engine</span>
              <p>Explore practical AI deployment playbooks and architecture notes.</p>
            </div>
            <div className="btn-group">
              <Link to="/insights" className="btn btn--primary btn--sm">
                Explore Insights
              </Link>
              <Link to="/solutions" className="btn btn--secondary btn--sm">
                Browse Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries — Horizontal Scrollable Strip ── */}
      {industries?.length > 0 && (
        <section className="section section--compact" id="industries">
          <div className="container">
            <div className="industries-header reveal">
              <div>
                <span className="label">Domains</span>
                <h2>Industrial Intelligence Across Domains</h2>
              </div>
            </div>
            <div className="industries-strip reveal">
              {industries.map((ind, i) => (
                <div key={ind._id || i} className="industry-chip">
                  <div className="industry-chip__icon" dangerouslySetInnerHTML={{ __html: ind.iconSvg }} />
                  <span>{ind.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Why Partner — Horizontal Scrollable ── */}
      {differentiators?.length > 0 && (
        <section className="section section--compact" id="why">
          <div className="container">
            <SectionHeader
              label="Why Partner"
              title="Why Partner with AARO7?"
              description="Domain-specific execution, adaptable architecture, and measurable outcomes."
              center
            />
            <div className="why-strip reveal">
              {differentiators.map((d, i) => (
                <div key={d._id || i} className="why-card">
                  <div className="why-card__number">{String(d.order).padStart(2, '0')}</div>
                  <h4>{d.title}</h4>
                  <p>{d.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title="Ready to Architect Your<br>Intelligence Layer?" />
    </>
  );
};

export default HomePage;
