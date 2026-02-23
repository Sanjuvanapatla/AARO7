import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const SunIcon = () => (
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);

const solutionsLinks = [
  { to: '/solutions', label: 'AI Solutions', desc: 'End-to-end AI services' },
  { to: '/capabilities', label: 'Capabilities', desc: 'Technical architecture depth' },
  { to: '/packages', label: 'Packages', desc: 'Engagement models & pricing' },
];

const resourcesLinks = [
  { to: '/case-studies', label: 'Case Studies', desc: 'Real-world impact stories' },
  { to: '/insights', label: 'Insights', desc: 'Thought leadership' },
  { to: '/trust-center', label: 'Trust Center', desc: 'Security & compliance' },
  { to: '/assessment', label: 'AI Readiness', desc: 'Assess your organisation' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const location = useLocation();
  const { isDark, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setOpenAccordion(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const isActive = (paths) => {
    const list = Array.isArray(paths) ? paths : [paths];
    return list.some(
      (p) => location.pathname === p || location.pathname.startsWith(p + '/')
    );
  };

  const toggleAccordion = (key) =>
    setOpenAccordion((prev) => (prev === key ? null : key));

  return (
    <>
      <nav
        className={`nav${scrolled ? ' nav--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav__inner">
          <Link to="/" className="nav__logo">
            <div className="nav__logo-mark">A7</div>
            AARO<span>7</span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="nav__links--desktop">
            <Link
              to="/"
              className={`nav__link${location.pathname === '/' ? ' nav__link--active' : ''}`}
            >
              Home
            </Link>

            {/* Solutions dropdown */}
            <div className="nav__item">
              <button
                className={`nav__link nav__link--btn${isActive(['/solutions', '/capabilities', '/packages']) ? ' nav__link--active' : ''}`}
              >
                Solutions
                <svg className="nav__dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="nav__dropdown">
                {solutionsLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="nav__dropdown-link">
                    <div className="nav__dropdown-label">{link.label}</div>
                    <div className="nav__dropdown-desc">{link.desc}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources dropdown */}
            <div className="nav__item">
              <button
                className={`nav__link nav__link--btn${isActive(['/case-studies', '/insights', '/trust-center', '/assessment']) ? ' nav__link--active' : ''}`}
              >
                Resources
                <svg className="nav__dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="nav__dropdown">
                {resourcesLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="nav__dropdown-link">
                    <div className="nav__dropdown-label">{link.label}</div>
                    <div className="nav__dropdown-desc">{link.desc}</div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className={`nav__link${isActive('/contact') ? ' nav__link--active' : ''}`}
            >
              Contact
            </Link>

            <Link to="/book-call" className="btn btn--primary nav__cta">
              Book Strategy Call
            </Link>

            <button
              className="nav__theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* ── Hamburger ── */}
          <button
            className={`nav__mobile-toggle${drawerOpen ? ' nav__mobile-toggle--active' : ''}`}
            aria-label="Toggle navigation"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className={`nav__overlay${drawerOpen ? ' nav__overlay--visible' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile slide-in drawer ── */}
      <aside
        className={`nav__drawer${drawerOpen ? ' nav__drawer--open' : ''}`}
        aria-label="Navigation menu"
      >
        <Link
          to="/"
          className={`nav__drawer-link${location.pathname === '/' ? ' nav__drawer-link--active' : ''}`}
        >
          Home
        </Link>

        {/* Solutions accordion */}
        <div className="nav__accordion">
          <button
            className={`nav__accordion-toggle${openAccordion === 'solutions' ? ' nav__accordion-toggle--open' : ''}`}
            onClick={() => toggleAccordion('solutions')}
          >
            Solutions
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"
              style={{ transition: 'transform 0.25s ease', transform: openAccordion === 'solutions' ? 'rotate(180deg)' : 'none' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`nav__accordion-content${openAccordion === 'solutions' ? ' nav__accordion-content--open' : ''}`}>
            {solutionsLinks.map((link) => (
              <Link key={link.to} to={link.to} className="nav__accordion-item">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Resources accordion */}
        <div className="nav__accordion">
          <button
            className={`nav__accordion-toggle${openAccordion === 'resources' ? ' nav__accordion-toggle--open' : ''}`}
            onClick={() => toggleAccordion('resources')}
          >
            Resources
            <svg
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"
              style={{ transition: 'transform 0.25s ease', transform: openAccordion === 'resources' ? 'rotate(180deg)' : 'none' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`nav__accordion-content${openAccordion === 'resources' ? ' nav__accordion-content--open' : ''}`}>
            {resourcesLinks.map((link) => (
              <Link key={link.to} to={link.to} className="nav__accordion-item">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          to="/contact"
          className={`nav__drawer-link${isActive('/contact') ? ' nav__drawer-link--active' : ''}`}
        >
          Contact
        </Link>

        <Link
          to="/book-call"
          className="btn btn--primary"
          style={{ marginTop: '1.5rem', textAlign: 'center', justifyContent: 'center' }}
        >
          Book Strategy Call
        </Link>

        <div className="nav__drawer-theme">
          <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
          <button onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
