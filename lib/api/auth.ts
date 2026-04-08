import axios from 'axios';

// Gunakan path proxy yang didefinisikan di next.config.js
// Pastikan di next.config.js, '/api-backend' diarahkan ke 'https://acsa-backend.vercel.app'
const API_URL = '/api-backend'; 

export const login = async (data: any) => {
  try {
    /**
     * PERBAIKAN: 
     * Jika di Postman jalan dengan /api/auth/login, 
     * maka di sini harus tetap menggunakan /api/auth/login 
     * karena proxy hanya mengganti DOMAIN, bukan PATH internal backend.
     */
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: data.email,
      password: data.password
    });

    // Opsional: Simpan token langsung jika login berhasil
    if (response.data?.access_token || response.data?.token) {
      const token = response.data.access_token || response.data.token;
      localStorage.setItem("access_token", token);
    }
    
    return response.data; 
  } catch (error: any) {
    // Berikan log yang jelas untuk debugging
    console.error("Login Error:", error.response?.data || error.message);
    throw error; // Lempar error agar bisa ditangkap oleh UI/SweetAlert
  }
};