import api from './api';

const generationService = {
  async generate(projectId: number, prompt: string) {
    const response = await api.post('/generate', { project_id: projectId, prompt });
    return response.data;
  },
  async refine(projectId: number, section: string, prompt: string) {
    const response = await api.post('/refine', { project_id: projectId, section, prompt });
    return response.data;
  },
  async export(projectId: number, format: string) {
    const response = await api.get(`/export`, { params: { project_id: projectId, format }, responseType: 'blob' });
    return response.data;
  },
};

export default generationService;
