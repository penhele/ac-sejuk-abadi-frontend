import { api } from "@/lib/api/axios";

export const verifyEmail = async (token: string) => {
  const { data } = await api.get(`/auth/verify-email`, {
    params: { token },
  });

  return data;
};
