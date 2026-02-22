import React, { useCallback } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Loader from '../components/ui/Loader';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import { fetchFunnelAnalytics } from '../services/growthService';
import useScrollReveal from '../hooks/useScrollReveal';

const GrowthDashboardPage = () => {
  usePageMeta({
    title: 'Growth Dashboard',
    description: 'Monitor conversion funnel metrics from website touchpoint to booked strategy call.',
  });

  const fetchFn = useCallback(() => fetchFunnelAnalytics(), []);
  const { data, loading } = useFetch(fetchFn);
  useScrollReveal([loading]);

  if (loading) return <Loader />;

  const totals = data?.totals || {};
  const last30Days = data?.last30Days || {};

  return (
    <>
      <PageHeader
        label="Analytics"
        title="Conversion Funnel<br>Dashboard"
        description="A view of lead generation and strategy-call conversion across the website touchpoints."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            <div className="card reveal">
              <h3>{totals.contactLeads || 0}</h3>
              <p>Contact Leads</p>
            </div>
            <div className="card reveal reveal-delay-1">
              <h3>{totals.readinessLeads || 0}</h3>
              <p>Readiness Leads</p>
            </div>
            <div className="card reveal reveal-delay-2">
              <h3>{totals.strategyCalls || 0}</h3>
              <p>Strategy Calls</p>
            </div>
          </div>

          <div className="contact-form reveal" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Funnel Performance</h3>
            <div className="grid grid--2">
              <div className="card">
                <p className="card__subheading">Total Qualified Leads</p>
                <h4 style={{ marginBottom: '0.5rem' }}>{totals.qualifiedLeads || 0}</h4>
                <p>Combined leads from contact inquiries and readiness submissions.</p>
              </div>
              <div className="card">
                <p className="card__subheading">Lead to Meeting Rate</p>
                <h4 style={{ marginBottom: '0.5rem' }}>{totals.leadToMeetingRate || 0}%</h4>
                <p>Percentage of qualified leads that converted into strategy-call submissions.</p>
              </div>
            </div>
          </div>

          <div className="contact-form reveal" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Last 30 Days</h3>
            <ul className="card__list">
              <li>Contact Leads: {last30Days.contactLeads || 0}</li>
              <li>Readiness Leads: {last30Days.readinessLeads || 0}</li>
              <li>Strategy Calls: {last30Days.strategyCalls || 0}</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>Updated at: {data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'N/A'}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default GrowthDashboardPage;
