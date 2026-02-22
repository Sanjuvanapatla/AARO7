import api from './api';

export const submitContactForm = async (formData) => {
  const { data } = await api.post('/contact', formData);
  return data;
};

export const fetchCompanyInfo = async () => {
  const { data } = await api.get('/company-info');
  return data;
};
