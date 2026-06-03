import Cookies from "js-cookie";
import { LoginPayload } from "../types/login-payload";
import { api } from "@/lib/api/axios";

export const login = async (data: LoginPayload) => {
  const response = await api.post("/auth/login", data);

  Cookies.set("access_token", response.data.access_token);
  Cookies.set("role", response.data.user.role);

  return response.data;
};
