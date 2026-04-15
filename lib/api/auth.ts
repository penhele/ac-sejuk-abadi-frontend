import axios from 'axios';

const API_URL = '/api-backend/api'; 

export const login = async (data: any) => {
  try {
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