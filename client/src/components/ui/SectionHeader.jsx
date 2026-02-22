import React from 'react';

const SectionHeader = ({ label, title, description, center }) => (
  <div className={`section-header reveal${center ? ' section-header--center' : ''}`}>
    <span className="label">{label}</span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>
);

export default SectionHeader;
