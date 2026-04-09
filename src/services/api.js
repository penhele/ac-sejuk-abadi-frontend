import axios from 'axios';

const api = axios.create({
  // Ganti URL lengkap menjadi path proxy yang ada di next.config.mjs
  // Kita gunakan '/api-backend' sebagai jembatan
  baseURL: '/api-backend/api', 
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor tetap sama untuk menangani token
api.interceptors.request.use((config) => {
  // Pastikan nama key di localStorage sama dengan yang kamu set saat login
  // Tadi di auth.ts kamu pakai "access_token", pastikan di sini juga sama
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;