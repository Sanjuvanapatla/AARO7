import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', exact: true },
  { to: '/solutions', label: 'Solutions' },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/insights', label: 'Insights' },
  { to: '/trust-center', label: 'Trust' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav__inner">
        <Link to="/" className="nav__logo">
          <div className="nav__logo-mark">A7</div>
          AARO<span>7</span>
        </Link>
        <div className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav__link${isActive(item.to, item.exact) ? ' nav__link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/book-call" className="btn btn--primary nav__cta">
            Book Strategy Call
          </Link>
        </div>
        <button
          className={`nav__mobile-toggle${menuOpen ? ' nav__mobile-toggle--active' : ''}`}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
