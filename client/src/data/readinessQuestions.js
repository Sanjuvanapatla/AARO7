const readinessQuestions = [
  {
    id: 'data_quality',
    category: 'Data Foundation',
    prompt: 'How would you describe the quality and availability of your operational data?',
    options: [
      { label: 'Mostly manual and fragmented', weight: 1 },
      { label: 'Partially structured but inconsistent', weight: 2 },
      { label: 'Well-structured in key systems', weight: 3 },
      { label: 'Governed, unified, and AI-ready', weight: 4 },
    ],
  },
  {
    id: 'ai_use_case_clarity',
    category: 'Strategy',
    prompt: 'How clearly defined are your AI use cases and business outcomes?',
    options: [
      { label: 'Exploratory with no defined use case', weight: 1 },
      { label: 'Some ideas, limited prioritization', weight: 2 },
      { label: 'Prioritized use cases with KPI targets', weight: 3 },
      { label: 'Roadmap aligned to business strategy', weight: 4 },
    ],
  },
  {
    id: 'team_capability',
    category: 'People and Process',
    prompt: 'How prepared is your team to operate AI-driven workflows?',
    options: [
      { label: 'No internal AI ownership yet', weight: 1 },
      { label: 'A few champions, no operating model', weight: 2 },
      { label: 'Cross-functional owners are defined', weight: 3 },
      { label: 'Clear ownership with ongoing enablement', weight: 4 },
    ],
  },
  {
    id: 'integration_maturity',
    category: 'Technology',
    prompt: 'How integrated are your core systems (ERP, CRM, data sources, tooling)?',
    options: [
      { label: 'Mostly disconnected', weight: 1 },
      { label: 'Some APIs, many manual handoffs', weight: 2 },
      { label: 'Key workflows integrated', weight: 3 },
      { label: 'Reliable integrations with monitoring', weight: 4 },
    ],
  },
  {
    id: 'governance_security',
    category: 'Risk and Governance',
    prompt: 'How mature is your AI governance, security, and compliance posture?',
    options: [
      { label: 'No formal controls today', weight: 1 },
      { label: 'Basic controls in place', weight: 2 },
      { label: 'Defined policies and review gates', weight: 3 },
      { label: 'Enterprise-grade governance and auditability', weight: 4 },
    ],
  },
];

export default readinessQuestions;
