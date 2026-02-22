import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="nav__logo">
            <div className="nav__logo-mark">A7</div>
            AARO<span>7</span>
          </Link>
          <p>End-to-end AI engineering hub mastering the full stack - from foundational models to agentic orchestration.</p>
        </div>
        <div className="footer__col">
          <h4>Core</h4>
          <Link to="/">Home</Link>
          <Link to="/solutions">Solutions</Link>
          <Link to="/capabilities">Capabilities</Link>
          <Link to="/case-studies">Case Studies</Link>
          <Link to="/insights">Insights</Link>
        </div>
        <div className="footer__col">
          <h4>Tools</h4>
          <Link to="/assessment">AI Readiness Assessment</Link>
          <Link to="/roi-calculator">ROI Calculator</Link>
          <Link to="/packages">Engagement Packages</Link>
          <Link to="/trust-center">Trust Center</Link>
          <Link to="/growth-dashboard">Growth Dashboard</Link>
        </div>
        <div className="footer__col">
          <h4>Connect</h4>
          <Link to="/book-call">Book Strategy Call</Link>
          <Link to="/contact">Contact Team</Link>
          <a href="mailto:contact@aaro7.com">contact@aaro7.com</a>
        </div>
      </div>
      <div className="footer__bottom">
        <span>&copy; 2026 AARO7 Fintech Pvt Ltd. All rights reserved.</span>
        <span>We don't just prompt the future; we architect it.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
