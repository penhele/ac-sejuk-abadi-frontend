import { User } from "@/features/user/types/user";
import { api } from "@/lib/api/axios";

export const getMe = async (): Promise<User> => {
  const response = await api.get("/auth/me");

  return response.data;
};
