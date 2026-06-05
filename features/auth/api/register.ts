import { api } from "@/lib/api/axios";
import { RegisterPayload } from "../types/register-payload";

export const register = async (data: RegisterPayload) => {
  const response = await api.post("/auth/register", data);

  return response.data
};
