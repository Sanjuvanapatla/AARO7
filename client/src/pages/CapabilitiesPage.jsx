import React, { useCallback } from 'react';
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

  const fetchFn = useCallback(
    () =>
      Promise.all([fetchCapabilities(), fetchMcpFeatures()]).then(([capabilities, mcpFeatures]) => ({
        capabilities,
        mcpFeatures,
      })),
    []
  );
  const { data, loading } = useFetch(fetchFn);

  useScrollReveal([loading]);

  if (loading) return <Loader />;

  const capabilities = data?.capabilities || [];
  const mcpFeatures = data?.mcpFeatures || [];

  return (
    <>
      <PageHeader
        label="Technical Depth"
        title="Full-Stack AI<br>Architecture Mastery"
        description="A deep technical breakdown of our engineering capabilities - from foundational model development to enterprise-scale agentic deployment."
      />

      {capabilities.map((layer, index) => (
        <React.Fragment key={layer._id || layer.layerNumber || index}>
          <section className="section--tight" id={layer.sectionId}>
            <div className="container">
              <div className={`capability-section reveal${layer.isReversed ? ' capability-section--reverse' : ''}`}>
                <div className="capability-content">
                  <span className="label">Layer {String(layer.layerNumber).padStart(2, '0')}</span>
                  <h3>{layer.title}</h3>
                  {(layer.paragraphs || []).map((text, textIndex) => (
                    <p key={textIndex}>{text}</p>
                  ))}
                  <div className="tech-list">
                    {(layer.technologies || []).map((tech, techIndex) => (
                      <span key={`${tech}-${techIndex}`} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="capability-visual">
                  <CapabilityDiagram layer={layer} />
                </div>
              </div>
            </div>
          </section>
          {index < capabilities.length - 1 && <Divider />}
        </React.Fragment>
      ))}

      <Divider />

      <section className="section" id="mcp">
        <div className="container">
          <SectionHeader
            label="Protocol"
            title="The MCP Ecosystem"
            description="The Model Context Protocol is the backbone of our agentic architecture - enabling seamless communication between AI models, tools, and data sources through a standardized interface layer."
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

      <CtaBanner title="Ready to Explore Our<br>Technical Architecture?" buttonText="Schedule a Technical Deep-Dive" />
    </>
  );
};

export default CapabilitiesPage;
