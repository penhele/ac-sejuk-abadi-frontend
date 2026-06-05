import { api } from "@/lib/api/axios";

export const deleteUser = async (id: string | number) => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};
