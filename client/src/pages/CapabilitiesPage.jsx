import React, { useState, useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import useScrollReveal from '../hooks/useScrollReveal';
import Loader from '../components/ui/Loader';
import PageHeader from '../components/layout/PageHeader';
import Divider from '../components/ui/Divider';
import CtaBanner from '../components/ui/CtaBanner';
import SectionHeader from '../components/ui/SectionHeader';
import { fetchCapabilities, fetchMcpFeatures } from '../services/capabilityService';
import usePageMeta from '../hooks/usePageMeta';

const CapabilityDiagram = ({ layer }) => {
  const hasAgents = Array.isArray(layer.agents) && layer.agents.length > 0;
  const stages = layer.stages || [];

  if (!hasAgents) {
    return (
      <div className="arch-diagram">
        {stages.map((stage, index) => (
          <React.Fragment key={`${stage.label}-${index}`}>
            <div className="arch-layer">
              <span className="arch-layer__label">{stage.label}</span>
              <span className="arch-layer__content">{stage.content}</span>
            </div>
            {index < stages.length - 1 && <div className="arch-connector"></div>}
          </React.Fragment>
        ))}
      </div>
    );
  }

  const [firstStage, ...restStages] = stages;
  const middleStages = restStages.slice(0, -1);
  const lastStage = restStages[restStages.length - 1];

  return (
    <div className="arch-diagram">
      {firstStage && (
        <>
          <div
            className="arch-layer"
            style={{ borderColor: 'rgba(56, 189, 248, 0.2)', background: 'rgba(56, 189, 248, 0.06)' }}
          >
            <span className="arch-layer__label">{firstStage.label}</span>
            <span className="arch-layer__content">{firstStage.content}</span>
          </div>
          <div className="arch-connector"></div>
        </>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
        {layer.agents.slice(0, 2).map((agent, index) => (
          <div key={`${agent.label}-${index}`} className="arch-layer">
            <span className="arch-layer__label">{agent.label}</span>
            <span className="arch-layer__content">{agent.content}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
        {layer.agents.slice(2, 4).map((agent, index) => (
          <div key={`${agent.label}-${index}`} className="arch-layer">
            <span className="arch-layer__label">{agent.label}</span>
            <span className="arch-layer__content">{agent.content}</span>
          </div>
        ))}
      </div>

      {middleStages.length > 0 && <div className="arch-connector"></div>}
      {middleStages.map((stage, index) => (
        <React.Fragment key={`${stage.label}-${index}`}>
          <div className="arch-layer">
            <span className="arch-layer__label">{stage.label}</span>
            <span className="arch-layer__content">{stage.content}</span>
          </div>
          {(index < middleStages.length - 1 || lastStage) && <div className="arch-connector"></div>}
        </React.Fragment>
      ))}
      {lastStage && (
        <div className="arch-layer">
          <span className="arch-layer__label">{lastStage.label}</span>
          <span className="arch-layer__content">{lastStage.content}</span>
        </div>
      )}
    </div>
  );
};

const CapabilitiesPage = () => {
  usePageMeta({
    title: 'Capabilities',
    description:
      'Technical architecture depth across model lifecycle, RAG systems, MCP agent orchestration, and production deployment.',
  });

  const [activeTab, setActiveTab] = useState(0);

  const fetchFn = useCallback(
    () =>
      Promise.all([fetchCapabilities(), fetchMcpFeatures()]).then(([capabilities, mcpFeatures]) => ({
        capabilities,
        mcpFeatures,
      })),
    []
  );
  const { data, loading } = useFetch(fetchFn);

  useScrollReveal([loading, activeTab]);

  if (loading) return <Loader />;

  const capabilities = data?.capabilities || [];
  const mcpFeatures = data?.mcpFeatures || [];
  const activeLayer = capabilities[activeTab];

  return (
    <>
      <PageHeader
        label="Technical Depth"
        title="Full-Stack AI<br>Architecture Mastery"
        description="A deep technical breakdown of our engineering capabilities — from foundational model development to enterprise-scale agentic deployment."
      />

      {capabilities.length > 0 && (
        <section className="section--tight">
          <div className="container">
            {/* Tab strip */}
            <div className="cap-tabs" role="tablist" aria-label="Capability layers">
              {capabilities.map((layer, index) => (
                <button
                  key={layer._id || index}
                  role="tab"
                  aria-selected={activeTab === index}
                  className={`cap-tab${activeTab === index ? ' cap-tab--active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  L{String(layer.layerNumber).padStart(2, '0')} — {layer.title}
                </button>
              ))}
            </div>

            {/* Active layer panel */}
            {activeLayer && (
              <div
                key={activeLayer._id || activeTab}
                className={`capability-section reveal${activeLayer.isReversed ? ' capability-section--reverse' : ''}`}
                role="tabpanel"
              >
                <div className="capability-content">
                  <span className="label">Layer {String(activeLayer.layerNumber).padStart(2, '0')}</span>
                  <h3>{activeLayer.title}</h3>
                  {(activeLayer.paragraphs || []).map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                  <div className="tech-list">
                    {(activeLayer.technologies || []).map((tech, i) => (
                      <span key={`${tech}-${i}`} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="capability-visual">
                  <CapabilityDiagram layer={activeLayer} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <Divider />

      <section className="section" id="mcp">
        <div className="container">
          <SectionHeader
            label="Protocol"
            title="The MCP Ecosystem"
            description="The Model Context Protocol is the backbone of our agentic architecture — enabling seamless communication between AI models, tools, and data sources through a standardised interface layer."
            center
          />

          <div className="grid grid--3 reveal">
            {mcpFeatures.map((feature, index) => (
              <div key={feature._id || index} className="card">
                <div className="card__icon" dangerouslySetInnerHTML={{ __html: feature.iconSvg }} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to Explore Our<br>Technical Architecture?"
        buttonText="Schedule a Technical Deep-Dive"
      />
    </>
  );
};

export default CapabilitiesPage;
