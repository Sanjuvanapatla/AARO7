import React from 'react';

const CounterMetric = ({ value, suffix, label }) => (
  <div className="hero__metric">
    <span
      className="hero__metric-value"
      data-counter={value}
      data-suffix={suffix}
    >
      0{suffix}
    </span>
    <span className="hero__metric-label">{label}</span>
  </div>
);

export default CounterMetric;
