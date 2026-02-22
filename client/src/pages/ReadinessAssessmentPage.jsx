import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import readinessQuestions from '../data/readinessQuestions';
import usePageMeta from '../hooks/usePageMeta';
import { submitReadinessAssessment } from '../services/growthService';
import useScrollReveal from '../hooks/useScrollReveal';

const getMaturityLevel = (percentage) => {
  if (percentage < 40) return 'Early';
  if (percentage < 65) return 'Developing';
  if (percentage < 85) return 'Advanced';
  return 'Leader';
};

const categoryRecommendations = {
  'Data Foundation': 'Build a structured data ingestion and quality program before scaling model complexity.',
  Strategy: 'Prioritize two high-value use cases with measurable KPIs and executive ownership.',
  'People and Process': 'Establish cross-functional AI ownership and define operational playbooks.',
  Technology: 'Reduce integration bottlenecks through API-first architecture and workflow instrumentation.',
  'Risk and Governance': 'Implement policy controls, audit trails, and model-review checkpoints.',
};

const ReadinessAssessmentPage = () => {
  usePageMeta({
    title: 'AI Readiness Assessment',
    description: 'Evaluate your organization readiness for AI deployment and get a tailored execution recommendation.',
  });
  useScrollReveal([]);

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    industry: '',
  });
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const maxScore = readinessQuestions.reduce((sum, question) => {
    const topWeight = Math.max(...question.options.map((option) => option.weight));
    return sum + topWeight;
  }, 0);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
  };

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((previous) => ({ ...previous, [questionId]: String(optionIndex) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!profile.name || !profile.email) {
      setError('Please provide your name and work email.');
      return;
    }

    if (answeredCount !== readinessQuestions.length) {
      setError('Please answer every readiness question before submitting.');
      return;
    }

    const normalizedAnswers = readinessQuestions.map((question) => {
      const option = question.options[Number(answers[question.id])];
      return {
        questionId: question.id,
        prompt: question.prompt,
        answer: option.label,
        weight: option.weight,
        category: question.category,
      };
    });

    const score = normalizedAnswers.reduce((sum, item) => sum + item.weight, 0);
    const percentage = Number(((score / maxScore) * 100).toFixed(2));
    const maturityLevel = getMaturityLevel(percentage);

    const lowCategories = normalizedAnswers.filter((item) => item.weight < 3).map((item) => item.category);
    const recommendations = Array.from(new Set(lowCategories)).map((category) => categoryRecommendations[category]);

    const payload = {
      ...profile,
      score,
      maxScore,
      percentage,
      maturityLevel,
      recommendations: recommendations.length > 0 ? recommendations : ['Your baseline is strong. Focus on scaling safely.'],
      answers: normalizedAnswers,
    };

    try {
      setSubmitting(true);
      await submitReadinessAssessment(payload);
      setResult(payload);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'Unable to submit assessment right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        label="Assessment"
        title="AI Readiness Assessment"
        description="Answer a few practical questions to benchmark maturity and get a tailored deployment recommendation."
      />

      <section className="section">
        <div className="container">
          {!result ? (
            <form className="contact-form reveal assessment-form" onSubmit={handleSubmit}>
              <h2 style={{ marginBottom: '1rem' }}>Organization Profile</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" value={profile.name} onChange={handleProfileChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input id="company" name="company" value={profile.company} onChange={handleProfileChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="industry">Industry</label>
                  <input id="industry" name="industry" value={profile.industry} onChange={handleProfileChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input id="role" name="role" value={profile.role} onChange={handleProfileChange} />
              </div>

              <h2 style={{ margin: '1.5rem 0 1rem' }}>Readiness Questions</h2>
              {readinessQuestions.map((question, questionIndex) => (
                <div key={question.id} className="assessment-question">
                  <p>
                    <strong>
                      {questionIndex + 1}. {question.prompt}
                    </strong>
                  </p>
                  <span className="tech-tag">{question.category}</span>
                  <div style={{ marginTop: '0.75rem' }}>
                    {question.options.map((option, optionIndex) => (
                      <label key={option.label} className="assessment-option">
                        <input
                          type="radio"
                          name={question.id}
                          checked={answers[question.id] === String(optionIndex)}
                          onChange={() => handleAnswerChange(question.id, optionIndex)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {error ? <p className="text-muted">{error}</p> : null}

              <button className="btn btn--primary" type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Get Readiness Score'}
              </button>
            </form>
          ) : (
            <div className="contact-form reveal">
              <h2 style={{ marginBottom: '0.75rem' }}>Your Readiness Result</h2>
              <p style={{ marginBottom: '1rem' }}>
                Score: <strong>{result.score}</strong> / {result.maxScore} ({result.percentage}%)
              </p>
              <div className="card__metric" style={{ marginBottom: '1rem' }}>
                <strong>Maturity Level:</strong> {result.maturityLevel}
              </div>
              <h3 style={{ marginBottom: '0.75rem' }}>Recommended Next Steps</h3>
              <ul className="card__list">
                {result.recommendations.map((recommendation) => (
                  <li key={recommendation}>{recommendation}</li>
                ))}
              </ul>
              <div className="btn-group" style={{ marginTop: '1rem' }}>
                <Link to="/book-call" className="btn btn--primary">
                  Book Strategy Call
                </Link>
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => {
                    setResult(null);
                    setAnswers({});
                  }}
                >
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ReadinessAssessmentPage;
