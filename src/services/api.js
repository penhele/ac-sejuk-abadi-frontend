import axios from 'axios';

const api = axios.create({
  // Ubah ini! Pakai prefix yang ada di next.config.mjs
  baseURL: '/api-backend', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor tetap sama...
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;