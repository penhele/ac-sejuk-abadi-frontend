import { api } from "@/lib/api/axios";
import { User } from "../types/user";

export const getUser = async (id: string | number): Promise<User> => {
  const response = await api.get(`/auth/users/${id}`);

  return response.data;
};
