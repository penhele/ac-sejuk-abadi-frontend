import {
  AppError,
  AppValidationError,
  NestApiResponseError,
} from "@/types/error";
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const chatApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHATBOT_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as NestApiResponseError;
      const statusCode = data.statusCode || error.response.status;

      // Jika error berupa array (biasanya class-validator NestJS)
      let message = "Terjadi kesalahan pada sistem";
      let validationErrors: AppValidationError[] = [];

      if (Array.isArray(data.message)) {
        message = "Validasi gagal. Silakan periksa kembali data Anda.";
        // Opsional: petakan ke field jika formatnya mendukung (misal: "email must be an email")
        validationErrors = data.message.map((msg) => ({
          field: msg.split(" ")[0] || "global",
          message: msg,
        }));
      } else if (typeof data.message === "string") {
        message = data.message;
      }

      // Lempar error custom yang sudah bersih
      return Promise.reject(
        new AppError(message, statusCode, validationErrors),
      );
    }

    return Promise.reject(new AppError(error.message || "Network Error", 500));
  },
);
