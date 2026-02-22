import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import usePageMeta from '../hooks/usePageMeta';
import { submitStrategyCall } from '../services/growthService';
import useScrollReveal from '../hooks/useScrollReveal';

const initialForm = {
  name: '',
  email: '',
  company: '',
  role: '',
  industry: '',
  teamSize: '',
  currentStage: '',
  primaryUseCase: '',
  timeline: '',
  budgetRange: '',
  dataReadiness: '',
  objectives: [],
  preferredRegion: '',
  notes: '',
};

const objectiveOptions = [
  'Improve productivity',
  'Reduce error rates',
  'Automate workflows',
  'Improve compliance posture',
  'Accelerate go-to-market',
];

const BookCallPage = () => {
  usePageMeta({
    title: 'Book Strategy Call',
    description: 'Share your goals and constraints through a structured intake funnel before your strategy call.',
  });
  useScrollReveal([]);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const onObjectiveToggle = (value) => {
    setForm((previous) => {
      const exists = previous.objectives.includes(value);
      const objectives = exists
        ? previous.objectives.filter((item) => item !== value)
        : [...previous.objectives, value];
      return { ...previous, objectives };
    });
  };

  const nextStep = () => {
    setError('');
    if (step === 1 && (!form.name || !form.email || !form.company)) {
      setError('Please complete name, email, and company to continue.');
      return;
    }
    if (step === 2 && !form.primaryUseCase) {
      setError('Please define your primary use case before continuing.');
      return;
    }
    setStep((previous) => Math.min(previous + 1, 3));
  };

  const previousStep = () => {
    setError('');
    setStep((previous) => Math.max(previous - 1, 1));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.company || !form.primaryUseCase) {
      setError('Please complete all required details.');
      return;
    }

    try {
      setSubmitting(true);
      await submitStrategyCall(form);
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to submit right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        label="Strategy Call"
        title="Book a Structured<br>AI Strategy Session"
        description="Share your context first. We use it to make your first call practical, focused, and execution-ready."
      />

      <section className="section">
        <div className="container">
          {!submitted ? (
            <form className="contact-form reveal" onSubmit={onSubmit}>
              <div className="funnel-progress">
                <span className={step >= 1 ? 'funnel-progress__step funnel-progress__step--active' : 'funnel-progress__step'}>
                  1. Profile
                </span>
                <span className={step >= 2 ? 'funnel-progress__step funnel-progress__step--active' : 'funnel-progress__step'}>
                  2. Scope
                </span>
                <span className={step >= 3 ? 'funnel-progress__step funnel-progress__step--active' : 'funnel-progress__step'}>
                  3. Objectives
                </span>
              </div>

              {step === 1 ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input id="name" name="name" value={form.name} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Work Email</label>
                      <input id="email" type="email" name="email" value={form.email} onChange={onChange} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input id="company" name="company" value={form.company} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <input id="role" name="role" value={form.role} onChange={onChange} />
                    </div>
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="industry">Industry</label>
                      <input id="industry" name="industry" value={form.industry} onChange={onChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="teamSize">Team Size</label>
                      <input id="teamSize" name="teamSize" value={form.teamSize} onChange={onChange} placeholder="e.g. 50-200" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="primaryUseCase">Primary Use Case</label>
                    <textarea
                      id="primaryUseCase"
                      name="primaryUseCase"
                      value={form.primaryUseCase}
                      onChange={onChange}
                      required
                      placeholder="What process do you want to improve first?"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="currentStage">Current Stage</label>
                      <input id="currentStage" name="currentStage" value={form.currentStage} onChange={onChange} placeholder="Idea, Pilot, Scaling..." />
                    </div>
                    <div className="form-group">
                      <label htmlFor="timeline">Target Timeline</label>
                      <input id="timeline" name="timeline" value={form.timeline} onChange={onChange} placeholder="e.g. 8-12 weeks" />
                    </div>
                  </div>
                </>
              ) : null}

              {step === 3 ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="budgetRange">Budget Range</label>
                      <input id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={onChange} placeholder="e.g. $75k-$150k" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dataReadiness">Data Readiness</label>
                      <input
                        id="dataReadiness"
                        name="dataReadiness"
                        value={form.dataReadiness}
                        onChange={onChange}
                        placeholder="Structured, partial, fragmented..."
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Primary Objectives</label>
                    <div className="assessment-grid">
                      {objectiveOptions.map((objective) => (
                        <label key={objective} className="assessment-option">
                          <input
                            type="checkbox"
                            checked={form.objectives.includes(objective)}
                            onChange={() => onObjectiveToggle(objective)}
                          />
                          <span>{objective}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredRegion">Preferred Meeting Region / Time Zone</label>
                      <input
                        id="preferredRegion"
                        name="preferredRegion"
                        value={form.preferredRegion}
                        onChange={onChange}
                        placeholder="e.g. US Eastern"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="notes">Additional Notes</label>
                    <textarea id="notes" name="notes" value={form.notes} onChange={onChange} />
                  </div>
                </>
              ) : null}

              {error ? <p className="text-muted">{error}</p> : null}

              <div className="btn-group" style={{ marginTop: '0.5rem' }}>
                {step > 1 ? (
                  <button type="button" className="btn btn--secondary" onClick={previousStep}>
                    Back
                  </button>
                ) : null}
                {step < 3 ? (
                  <button type="button" className="btn btn--primary" onClick={nextStep}>
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="btn btn--primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit and Request Slot'}
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="contact-form reveal">
              <h2 style={{ marginBottom: '0.75rem' }}>Request Submitted</h2>
              <p style={{ marginBottom: '1rem' }}>
                Thanks, {form.name}. Our team will reach out within one business day with proposed time slots.
              </p>
              <div className="btn-group">
                <Link to="/contact" className="btn btn--secondary">
                  Contact Us
                </Link>
                <Link to="/assessment" className="btn btn--ghost">
                  Complete AI Readiness Assessment
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BookCallPage;
