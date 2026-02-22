import api from './api';

export const submitReadinessAssessment = async (payload) => {
  const { data } = await api.post('/readiness-assessments', payload);
  return data;
};

export const submitStrategyCall = async (payload) => {
  const { data } = await api.post('/strategy-calls', payload);
  return data;
};

export const fetchFunnelAnalytics = async () => {
  const { data } = await api.get('/analytics/funnel');
  return data;
};
