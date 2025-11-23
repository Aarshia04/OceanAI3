import apiClient from './client.js';

export const fetchProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data;
};

export const fetchProject = async (projectId) => {
  const response = await apiClient.get(`/projects/${projectId}`);
  return response.data;
};

export const updateProject = async (projectId, payload) => {
  const response = await apiClient.put(`/projects/${projectId}`, payload);
  return response.data;
};

export const exportProject = async (projectId) => {
  const response = await apiClient.post(`/projects/${projectId}/export`, {});
  return response.data;
};
