import { api } from "@/lib/api/axios";
import { UserAdmin } from "../types/user";

export const getUser = async (id: string | number): Promise<UserAdmin> => {
  const response = await api.get(`/auth/users/${id}`);

  return response.data;
};
