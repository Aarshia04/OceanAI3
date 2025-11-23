import api from './api';

const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  },
  async register(email: string, password: string) {
    const response = await api.post('/auth/register', { email, password });
    localStorage.setItem('token', response.data.access_token);
    return response.data;
  },
};

export default authService;
