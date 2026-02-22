import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useScrollReveal from '../hooks/useScrollReveal';
import useCounter from '../hooks/useCounter';
import Loader from '../components/ui/Loader';
import Divider from '../components/ui/Divider';
import SectionHeader from '../components/ui/SectionHeader';
import CtaBanner from '../components/ui/CtaBanner';
import HeroSection from '../components/home/HeroSection';
import VisionMission from '../components/home/VisionMission';
import ServiceCard from '../components/home/ServiceCard';
import IndustryGrid from '../components/home/IndustryGrid';
import WhyGrid from '../components/home/WhyGrid';
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

  return (
    <>
      <HeroSection companyInfo={companyInfo} />

      <VisionMission companyInfo={companyInfo} />

      <Divider />

      <section className="section" id="services">
        <div className="container">
          <SectionHeader
            label="Services & Capabilities"
            title="AI Built For Real-World Business Outcomes"
            description="At AARO7, we turn AI into a practical ally for your business across fintech, automotive, healthcare, manufacturing, and beyond."
          />
          <div className="services-intro reveal">
            <p>
              We handle the heavy lifting so your team can focus on core operations. Every solution is customized to your
              domain, integrated with your systems, and designed to deliver efficiency, innovation, and growth without
              complexity.
            </p>
            <p>
              Our offerings are built around three pillars: Custom AI Model Development, Smart Information Retrieval, and
              Intelligent Workflow Automation.
            </p>
            <div className="services-actions">
              <Link to="/book-call" className="btn btn--primary">
                Book Strategy Call
              </Link>
              <Link to="/case-studies" className="btn btn--secondary">
                View Case Studies
              </Link>
            </div>
          </div>
          <div className="grid grid--3">
            {services?.map((s, i) => (
              <ServiceCard key={s._id || i} service={s} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="section" id="growth-tools">
        <div className="container">
          <SectionHeader
            label="Growth Tools"
            title="Conversion Paths For Every Buyer Stage"
            description="From first evaluation to committed deployment, these tools help visitors self-qualify and move to action."
          />
          <div className="grid grid--4">
            <article className="card reveal">
              <h3>AI Readiness Assessment</h3>
              <p>Score your deployment readiness and get prioritized next steps.</p>
              <Link to="/assessment" className="btn btn--secondary">
                Start Assessment
              </Link>
            </article>
            <article className="card reveal reveal-delay-1">
              <h3>ROI Calculator</h3>
              <p>Estimate annual value, savings, and payback period for your initiative.</p>
              <Link to="/roi-calculator" className="btn btn--secondary">
                Calculate ROI
              </Link>
            </article>
            <article className="card reveal reveal-delay-2">
              <h3>Engagement Packages</h3>
              <p>Choose a delivery model aligned to your current maturity and urgency.</p>
              <Link to="/packages" className="btn btn--secondary">
                View Packages
              </Link>
            </article>
            <article className="card reveal reveal-delay-3">
              <h3>Trust Center</h3>
              <p>Review security, governance, and model risk practices before deployment.</p>
              <Link to="/trust-center" className="btn btn--secondary">
                Explore Trust Center
              </Link>
            </article>
          </div>
        </div>
      </section>

      <Divider />

      <section className="section" id="content-engine">
        <div className="container">
          <SectionHeader
            label="Content Engine"
            title="Learn Before You Commit"
            description="Explore practical AI deployment playbooks and architecture notes built for decision-makers and technical teams."
          />
          <div className="btn-group reveal">
            <Link to="/insights" className="btn btn--primary">
              Explore Insights
            </Link>
            <Link to="/solutions" className="btn btn--secondary">
              Browse Industry Solutions
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {industries?.length > 0 && <IndustryGrid industries={industries} />}

      <Divider />

      {differentiators?.length > 0 && <WhyGrid differentiators={differentiators} />}

      <CtaBanner title="Ready to Architect Your<br>Intelligence Layer?" />
    </>
  );
};

export default HomePage;
