import React from 'react';

const PageHeader = ({ label, title, description }) => (
  <section className="page-header">
    <div className="container">
      <span className="label">{label}</span>
      <h1 dangerouslySetInnerHTML={{ __html: title }} />
      <p>{description}</p>
    </div>
  </section>
);

export default PageHeader;
