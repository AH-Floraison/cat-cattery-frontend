import api from './index';

export const getAbout = () => api.get('/about');
export const updateAbout = (data) => api.put('/about', data);
export const uploadAboutImage = (formData) => api.post('/about/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); 