import Cookies from "js-cookie";
import { LoginPayload } from "../types/login-payload";
import { api } from "@/lib/api/axios";

export const login = async (data: LoginPayload) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
