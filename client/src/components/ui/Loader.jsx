import React from 'react';

const Loader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    color: 'var(--text-muted)',
    fontSize: '1rem',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.1em',
  }}>
    Loading...
  </div>
);

export default Loader;
