import api from './api';

export const sendAssistantMessage = async ({ message, history = [] }) => {
  const { data } = await api.post('/assistant/chat', { message, history });
  return data;
};
