import api from './api';

export interface ProjectPayload {
  title: string;
  document_type: '.docx' | '.pptx';
}

const projectService = {
  async list() {
    const response = await api.get('/projects');
    return response.data;
  },
  async get(id: number) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  async create(payload: ProjectPayload) {
    const response = await api.post('/projects', payload);
    return response.data;
  },
};

export default projectService;
