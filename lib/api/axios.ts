import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "https://acsa-backend.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

// ✅ Inject token ke setiap request
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
