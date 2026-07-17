import axios from "axios";

export const chatApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CHATBOT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
