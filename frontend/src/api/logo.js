import axios from 'axios';
const baseURL = 'http://localhost:3001';

export const getLogos = () => axios.get(baseURL + '/api/logos');
export const getActiveLogo = async () => {
  const res = await axios.get(baseURL + '/api/logos');
  return res.data.find(l => l.is_active);
}; 