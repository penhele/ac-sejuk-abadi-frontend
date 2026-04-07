import axios from 'axios';

// 1. GANTILAH Link Vercel dengan path proxy yang kita buat di next.config.js
// Ini akan menipu browser agar mengira kita memanggil domain sendiri
const API_URL = '/api-backend'; 

export const login = async (data: any) => {
  // 2. Sekarang request ini akan ke: http://localhost:3000/api-backend/auth/login
  // Next.js secara otomatis akan meneruskannya ke https://acsa-backend.vercel.app/auth/login
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email: data.email,
    password: data.password
  });
  
  return response.data; 
};