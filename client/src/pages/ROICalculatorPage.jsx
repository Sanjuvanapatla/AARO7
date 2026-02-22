import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import usePageMeta from '../hooks/usePageMeta';
import useScrollReveal from '../hooks/useScrollReveal';

const defaultInputs = {
  teamSize: 20,
  hourlyCost: 55,
  hoursSavedPerPersonPerWeek: 4,
  monthlyErrorCost: 15000,
  expectedImprovement: 30,
  implementationCost: 120000,
};

const ROICalculatorPage = () => {
  usePageMeta({
    title: 'AI ROI Calculator',
    description: 'Estimate annual value and payback period for your AI deployment initiative.',
  });
  useScrollReveal([]);

  const [inputs, setInputs] = useState(defaultInputs);

  const metrics = useMemo(() => {
    const productivitySavings =
      inputs.teamSize * inputs.hourlyCost * inputs.hoursSavedPerPersonPerWeek * 52 * (inputs.expectedImprovement / 100);
    const qualitySavings = inputs.monthlyErrorCost * 12 * (inputs.expectedImprovement / 100);
    const totalAnnualValue = productivitySavings + qualitySavings;
    const monthlyValue = totalAnnualValue / 12;
    const paybackMonths = monthlyValue > 0 ? inputs.implementationCost / monthlyValue : 0;

    return {
      productivitySavings,
      qualitySavings,
      totalAnnualValue,
      paybackMonths,
    };
  }, [inputs]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const numericValue = Number(value);
    setInputs((previous) => ({ ...previous, [name]: Number.isFinite(numericValue) ? numericValue : 0 }));
  };

  const currency = (amount) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

  return (
    <>
      <PageHeader
        label="Business Value"
        title="AI ROI Calculator"
        description="Model expected savings and payback timeline before you commit to full-scale implementation."
      />

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-form reveal">
              <h2 style={{ marginBottom: '1rem' }}>Input Assumptions</h2>
              <div className="form-group">
                <label htmlFor="teamSize">Team Size Impacted</label>
                <input id="teamSize" type="number" name="teamSize" value={inputs.teamSize} onChange={handleChange} min="1" />
              </div>
              <div className="form-group">
                <label htmlFor="hourlyCost">Average Hourly Cost (USD)</label>
                <input id="hourlyCost" type="number" name="hourlyCost" value={inputs.hourlyCost} onChange={handleChange} min="1" />
              </div>
              <div className="form-group">
                <label htmlFor="hoursSavedPerPersonPerWeek">Hours Saved Per Person Per Week</label>
                <input
                  id="hoursSavedPerPersonPerWeek"
                  type="number"
                  name="hoursSavedPerPersonPerWeek"
                  value={inputs.hoursSavedPerPersonPerWeek}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="monthlyErrorCost">Current Monthly Error/Rework Cost (USD)</label>
                <input
                  id="monthlyErrorCost"
                  type="number"
                  name="monthlyErrorCost"
                  value={inputs.monthlyErrorCost}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="expectedImprovement">Expected Improvement (%)</label>
                <input
                  id="expectedImprovement"
                  type="number"
                  name="expectedImprovement"
                  value={inputs.expectedImprovement}
                  onChange={handleChange}
                  min="1"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="implementationCost">Estimated Implementation Cost (USD)</label>
                <input
                  id="implementationCost"
                  type="number"
                  name="implementationCost"
                  value={inputs.implementationCost}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>

            <div className="contact-form reveal">
              <h2 style={{ marginBottom: '1rem' }}>Estimated Results</h2>
              <div className="case-study__metrics">
                <div className="case-study__metric-item">
                  <span className="case-study__metric-value">{currency(metrics.productivitySavings)}</span>
                  <span className="case-study__metric-desc">Annual Productivity Value</span>
                </div>
                <div className="case-study__metric-item">
                  <span className="case-study__metric-value">{currency(metrics.qualitySavings)}</span>
                  <span className="case-study__metric-desc">Annual Quality/Error Reduction Value</span>
                </div>
                <div className="case-study__metric-item">
                  <span className="case-study__metric-value">{currency(metrics.totalAnnualValue)}</span>
                  <span className="case-study__metric-desc">Total Annual Value</span>
                </div>
                <div className="case-study__metric-item">
                  <span className="case-study__metric-value">{metrics.paybackMonths.toFixed(1)} mo</span>
                  <span className="case-study__metric-desc">Estimated Payback Period</span>
                </div>
              </div>
              <p style={{ marginTop: '1rem' }}>
                This is a directional estimate. We can refine it with your real process data in a strategy session.
              </p>
              <div className="btn-group" style={{ marginTop: '1rem' }}>
                <Link to="/book-call" className="btn btn--primary">
                  Validate ROI With Our Team
                </Link>
                <Link to="/assessment" className="btn btn--secondary">
                  Start Readiness Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ROICalculatorPage;
