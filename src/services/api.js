import axios from 'axios';

const api = axios.create({
  baseURL: 'https://acsa-backend.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Otomatis pasang token kalau sudah login
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;