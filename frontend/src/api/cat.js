import api from './index';

export const getCats = () => api.get('/cats');
export const addCat = (data) => api.post('/cats', data);
export const updateCat = (id, data) => api.put(`/cats/${id}`, data);
export const deleteCat = (id) => api.delete(`/cats/${id}`); 