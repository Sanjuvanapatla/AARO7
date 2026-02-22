import React from 'react';
import { Link } from 'react-router-dom';

const CtaBanner = ({ title, subtitle, buttonText = 'Schedule a Strategy Call', to = '/book-call' }) => (
  <section className="section cta-banner">
    <div className="container reveal">
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && (
        <p style={{ maxWidth: '520px', margin: '0 auto 2rem', fontSize: '1.0625rem' }}>{subtitle}</p>
      )}
      <br />
      <Link to={to} className="btn btn--primary">
        {buttonText}
        <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </Link>
    </div>
  </section>
);

export default CtaBanner;
