import { api } from "@/lib/api/axios";
import { User } from "../types/user";

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/auth/users");

  return response.data;
};
