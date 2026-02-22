import api from './api';

export const fetchHomeData = async () => {
  const { data } = await api.get('/home');
  return data;
};
