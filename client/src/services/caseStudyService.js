import api from './api';

export const fetchCaseStudies = async () => {
  const { data } = await api.get('/case-studies');
  return data;
};
