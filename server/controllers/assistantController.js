const asyncHandler = require('../middleware/asyncHandler');
const CompanyInfo = require('../models/CompanyInfo');
const Service = require('../models/Service');
const CapabilityLayer = require('../models/CapabilityLayer');
const CaseStudy = require('../models/CaseStudy');

const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 2000;
const KNOWLEDGE_CACHE_TTL_MS = 5 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

let knowledgeCache = { value: '', expiresAt: 0 };
const requestBuckets = new Map();

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || 'unknown';
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const existing = requestBuckets.get(ip) || [];
  const inWindow = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  inWindow.push(now);
  requestBuckets.set(ip, inWindow);
  return inWindow.length > RATE_LIMIT_MAX_REQUESTS;
};

const normalizeHistory = (history) => {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string')
    .slice(-MAX_HISTORY_MESSAGES)
    .map((item) => ({
      role: item.role,
      content: item.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }))
    .filter((item) => item.content.length > 0);
};

const getKnowledgeContext = async () => {
  const now = Date.now();
  if (knowledgeCache.value && knowledgeCache.expiresAt > now) {
    return knowledgeCache.value;
  }

  try {
    const [companyInfo, services, capabilities, caseStudies] = await Promise.all([
      CompanyInfo.findOne().lean(),
      Service.find().sort({ order: 1 }).lean(),
      CapabilityLayer.find().sort({ layerNumber: 1 }).lean(),
      CaseStudy.find().sort({ order: 1 }).limit(4).lean(),
    ]);

    const serviceLines = (services || []).map((service) => `- ${service.title}: ${service.description}`).join('\n');
    const capabilityLines = (capabilities || []).map((cap) => `- ${cap.title}`).join('\n');
    const caseStudyLines = (caseStudies || [])
      .map((study) => {
        const primaryMetric = Array.isArray(study.headlineMetrics) ? study.headlineMetrics[0] : null;
        const metricPart = primaryMetric ? ` (${primaryMetric.value} ${primaryMetric.description})` : '';
        return `- ${study.industry}: ${study.title}${metricPart}`;
      })
      .join('\n');

    const context = [
      `Company: ${companyInfo?.companyName || 'AARO7 Fintech Pvt Ltd'}`,
      `Tagline: ${companyInfo?.tagline || "We don't just prompt the future; we architect it."}`,
      `Mission: ${companyInfo?.mission || 'Bridge the AI Deployment Gap with end-to-end execution.'}`,
      '',
      'Core services:',
      serviceLines || '- Custom AI Model Development\n- Smart Information Retrieval\n- Intelligent Workflow Automation',
      '',
      'Technical capability layers:',
      capabilityLines || '- AI Lifecycle Mastery\n- RAG Architecture\n- Agentic Orchestration via MCP',
      '',
      'Representative case studies:',
      caseStudyLines || '- Fintech, Automotive, Manufacturing, Healthcare deployments',
      '',
      'Important routes:',
      '- /capabilities',
      '- /case-studies',
      '- /solutions',
      '- /assessment',
      '- /roi-calculator',
      '- /packages',
      '- /trust-center',
      '- /book-call',
      '- /contact',
    ].join('\n');

    knowledgeCache = { value: context, expiresAt: now + KNOWLEDGE_CACHE_TTL_MS };
    return context;
  } catch (error) {
    return [
      'Company: AARO7 Fintech Pvt Ltd',
      "Tagline: We don't just prompt the future; we architect it.",
      'Core focus: custom models, RAG systems, workflow automation, and enterprise deployment.',
      'Direct users to /book-call for consultation and /assessment for readiness.',
    ].join('\n');
  }
};

const callOpenAIChatCompletions = async ({ apiKey, model, maxTokens, messages }) => {
  if (typeof fetch !== 'function') {
    throw new Error('Server runtime does not support fetch for OpenAI calls');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: maxTokens,
      messages,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      payload?.error?.message || `OpenAI request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  const reply = payload?.choices?.[0]?.message?.content;
  if (!reply || typeof reply !== 'string') {
    throw new Error('Assistant did not return a valid response');
  }

  return { reply: reply.trim(), usage: payload?.usage || null };
};

const chatWithAssistant = asyncHandler(async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(503);
    throw new Error('Assistant is not configured. Set OPENAI_API_KEY on the server.');
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429);
    throw new Error('Rate limit exceeded. Please wait a minute and try again.');
  }

  const rawMessage = req.body?.message;
  if (typeof rawMessage !== 'string' || !rawMessage.trim()) {
    res.status(400);
    throw new Error('Message is required');
  }

  const message = rawMessage.trim().slice(0, MAX_MESSAGE_LENGTH);
  const history = normalizeHistory(req.body?.history);

  const knowledgeContext = await getKnowledgeContext();
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const maxTokens = Number(process.env.ASSISTANT_MAX_TOKENS || 500);

  const systemPrompt = [
    'You are Ask AARO7, the website assistant for AARO7 Fintech Pvt Ltd.',
    'Your job: help visitors understand services, use cases, and next best action.',
    'Be concise, practical, and honest. Keep responses typically under 120 words unless asked.',
    'Prefer concrete action links/routes from the site when relevant.',
    'If unsure, say so and guide to /book-call.',
    'Do not invent pricing or unsupported claims.',
    '',
    'Company knowledge:',
    knowledgeContext,
  ].join('\n');

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: message },
  ];

  const { reply, usage } = await callOpenAIChatCompletions({
    apiKey,
    model,
    maxTokens,
    messages,
  });

  res.json({ reply, model, usage });
});

module.exports = { chatWithAssistant };
