import api from './api';

const projectService = {
  async list() {
    const response = await api.get('/projects');
    return response.data;
  },
  async get(id: number) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
};

export default projectService;
