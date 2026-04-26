import { api } from "@/lib/axios";
import { Login, Register } from "@/types/auth";
import { UpdateUserPayload, User } from "@/types/user";

export const getMe = async (): Promise<User> => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const updateMe = async (userId: string, data: UpdateUserPayload) => {
  const response = await api.put(`/users/${userId}`, data);

  return response.data;
};

export const register = async (data: Register) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const login = async (data: Login) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
