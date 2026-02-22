import React from 'react';

const ServiceCard = ({ service, delay }) => (
  <div className={`card reveal reveal-delay-${delay}`}>
    <div className="card__icon" dangerouslySetInnerHTML={{ __html: service.iconSvg }} />
    <h3>{service.title}</h3>
    <p>{service.description}</p>
    <p className="card__subheading">What We Deliver</p>
    <ul className="card__list">
      {(service.capabilities || []).map((cap, i) => (
        <li key={i}>{cap}</li>
      ))}
    </ul>
    <div className="card__metric">
      <svg viewBox="0 0 16 16">
        <path d="M2 14l4-4 3 3 5-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <strong>Real Results:</strong>
      {service.metric}
    </div>
  </div>
);

export default ServiceCard;
