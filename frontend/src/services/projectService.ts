import api from './api';

export interface DocumentConfigPayload {
  doc_type: '.docx' | '.pptx';
  title?: string;
  metadata?: Record<string, any>;
}

export interface ProjectPayload {
  name: string;
  description?: string;
  document_config: DocumentConfigPayload;
}

export interface Project {
  id: number;
  name: string;
  description?: string | null;
  document_config?: DocumentConfigPayload;
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
