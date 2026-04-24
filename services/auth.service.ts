import { api } from "@/lib/axios";
import { User } from "@/types/user";

interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
}

export const getMe = async (): Promise<User> => {
  const response = await api.get("/auth/me");

  return response.data;
};

export const updateMe = async (userId: string, data: UpdateUserPayload) => {
  const response = await api.put(`/users/${userId}`, data);

  return response.data;
};