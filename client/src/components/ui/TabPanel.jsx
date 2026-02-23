import React, { useState } from 'react';

const TabPanel = ({ tabs, defaultTab = 0, className = '' }) => {
  const [active, setActive] = useState(defaultTab);

  return (
    <div className={`tab-panel ${className}`}>
      <div className="tab-panel__nav">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`tab-panel__btn${i === active ? ' tab-panel__btn--active' : ''}`}
            onClick={() => setActive(i)}
          >
            {tab.icon && <span className="tab-panel__btn-icon" dangerouslySetInnerHTML={{ __html: tab.icon }} />}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel__content">
        {tabs[active]?.content}
      </div>
    </div>
  );
};

export default TabPanel;
