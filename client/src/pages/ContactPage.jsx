import React, { useCallback, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import useScrollReveal from '../hooks/useScrollReveal';
import Loader from '../components/ui/Loader';
import PageHeader from '../components/layout/PageHeader';
import { fetchCompanyInfo, submitContactForm } from '../services/contactService';
import usePageMeta from '../hooks/usePageMeta';

const initialForm = {
  name: '',
  company: '',
  role: '',
  email: '',
  project: '',
};

const ContactPage = () => {
  usePageMeta({
    title: 'Contact',
    description: 'Connect with AARO7 to discuss AI strategy, deployment architecture, and execution plans.',
  });

  const fetchFn = useCallback(() => fetchCompanyInfo(), []);
  const { data: companyInfo, loading } = useFetch(fetchFn);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useScrollReveal([loading]);

  const details = useMemo(
    () => [
      {
        title: 'Email',
        value: companyInfo?.email || 'contact@aaro7.com',
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        ),
      },
      {
        title: 'Headquarters',
        value: companyInfo?.headquarters || 'AARO7 Fintech Pvt Ltd',
        icon: (
          <svg viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        ),
      },
      {
        title: 'Response Time',
        value: companyInfo?.responseTime || 'Within 24 business hours',
        icon: (
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        ),
      },
    ],
    [companyInfo]
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      await submitContactForm(formData);
      setStatus({ type: 'success', message: 'Message sent successfully. We will reach out shortly.' });
      setFormData(initialForm);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err?.response?.data?.message || err?.message || 'Unable to send your message right now.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <PageHeader
        label="Connect"
        title="Let's Build Your Intelligence<br>Infrastructure."
        description="Whether you're exploring AI strategy or ready to deploy, our engineering team is prepared to architect your solution."
      />

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info reveal">
              <h2>Start the Conversation</h2>
              <p>
                We engage with enterprises seeking serious AI infrastructure - not experiments. If you're ready to
                architect intelligence at scale, we're ready to deliver.
              </p>

              <div className="contact-details">
                {details.map((detail, index) => (
                  <div key={`${detail.title}-${index}`} className="contact-detail">
                    <div className="contact-detail__icon">{detail.icon}</div>
                    <div>
                      <h4>{detail.title}</h4>
                      {detail.title === 'Email' ? (
                        <p>
                          <a href={`mailto:${detail.value}`}>{detail.value}</a>
                        </p>
                      ) : (
                        <p>{detail.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Mitchell"
                    required
                    value={formData.name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Acme Corporation"
                    required
                    value={formData.company}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role / Title</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    placeholder="VP of Engineering"
                    value={formData.role}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@acme.com"
                    required
                    value={formData.email}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="project">Project Overview</label>
                <textarea
                  id="project"
                  name="project"
                  placeholder="Describe your AI initiative, current challenges, and what you're looking to achieve..."
                  required
                  value={formData.project}
                  onChange={onChange}
                ></textarea>
              </div>

              {status.message ? (
                <p className={status.type === 'error' ? 'text-muted' : 'text-accent'} style={{ marginBottom: '1rem' }}>
                  {status.message}
                </p>
              ) : null}

              <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
