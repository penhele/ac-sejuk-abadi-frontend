import axios from 'axios';

// JANGAN gunakan http://localhost:3000 di sini.
// Gunakan prefix yang sudah kita buat di next.config.mjs
const API_URL = '/api-backend/api'; 

export const login = async (data: any) => {
  try {
    // Sekarang axios akan menembak ke: http://localhost:3001/api-backend/auth/login
    // Next.js akan meneruskannya secara internal ke: http://localhost:3000/auth/login
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: data.email,
      password: data.password
    });

    if (response.data?.access_token || response.data?.token) {
      const token = response.data.access_token || response.data.token;
      localStorage.setItem("access_token", token);
    }
    
    return response.data; 
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};