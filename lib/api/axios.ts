import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// --- 1. Request Interceptor ---
// Dieksekusi sebelum request terkirim ke server
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Contoh: Ambil token dari storage (localStorage/cookie)
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// --- 2. Response Interceptor ---
// Dieksekusi saat menerima respon dari server
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Jika sukses (status 2xx), langsung kembalikan data
    return response;
  },
  (error: AxiosError) => {
    // Tangani error secara global
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 401:
          console.error("Unauthorized: Sesi berakhir, silakan login kembali.");
          // Contoh: hapus token dan redirect ke login jika perlu
          // localStorage.removeItem("token");
          break;
        case 403:
          console.error("Forbidden: Anda tidak memiliki akses.");
          break;
        case 422:
          console.error("Validation Error:", data.errors);
          break;
        case 500:
          console.error("Server Error: Terjadi kesalahan pada server.");
          break;
        default:
          console.error(
            data?.message || "Terjadi kesalahan yang tidak diketahui.",
          );
      }
    } else if (error.request) {
      // Masalah jaringan (tidak ada respon dari server)
      console.error("Network Error: Periksa koneksi internet Anda.");
    }

    // Sangat Penting: Tetap gunakan Promise.reject agar error
    // bisa ditangkap oleh try-catch atau React Query di level komponen.
    return Promise.reject(error);
  },
);
