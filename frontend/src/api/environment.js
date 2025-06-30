import api from './index';

export const getEnvironments = () => api.get('/environments');
export const addEnvironment = (data) => api.post('/environments', data);
export const updateEnvironment = (id, data) => api.put(`/environments/${id}`, data);
export const deleteEnvironment = (id) => api.delete(`/environments/${id}`); 