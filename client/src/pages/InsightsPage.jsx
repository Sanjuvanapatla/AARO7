import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import insightArticles from '../data/insightArticles';
import usePageMeta from '../hooks/usePageMeta';

const InsightsPage = () => {
  usePageMeta({
    title: 'Insights',
    description: 'Practical playbooks, architecture notes, and deployment lessons for enterprise AI teams.',
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(insightArticles.map((article) => article.category)))],
    []
  );

  const visibleArticles = useMemo(() => {
    if (activeCategory === 'All') return insightArticles;
    return insightArticles.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  const onSubscribe = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <PageHeader
        label="Insights"
        title="Playbooks for Industrial<br>AI Execution"
        description="Actionable content for teams deploying AI in high-stakes business environments."
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-chip${activeCategory === category ? ' filter-chip--active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid--2">
            {visibleArticles.map((article, index) => (
              <article key={article.slug} className="card">
                <span className="label">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div className="card__metric">{article.readTime}</div>
              </article>
            ))}
          </div>

          {visibleArticles.length === 0 ? (
            <div className="contact-form" style={{ marginTop: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.75rem' }}>No insights in this category yet.</h3>
              <p>Use another filter or book a strategy session for direct guidance.</p>
            </div>
          ) : null}

          <div className="contact-form" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '0.75rem' }}>Subscribe for New Deployment Notes</h3>
            <p style={{ marginBottom: '1rem' }}>Get practical AI architecture and execution insights in your inbox.</p>
            {!subscribed ? (
              <form onSubmit={onSubscribe}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="insight-email">Work Email</label>
                    <input
                      id="insight-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button className="btn btn--primary" type="submit">
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <p className="text-accent">Subscribed successfully. We will share the next publication with you.</p>
            )}
            <div style={{ marginTop: '0.75rem' }}>
              <Link className="btn btn--ghost" to="/book-call">
                Prefer a direct strategy conversation?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InsightsPage;
