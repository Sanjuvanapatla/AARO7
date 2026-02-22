import api from './api';

export const fetchCapabilities = async () => {
  const { data } = await api.get('/capabilities');
  return data;
};

export const fetchMcpFeatures = async () => {
  const { data } = await api.get('/mcp-features');
  return data;
};
