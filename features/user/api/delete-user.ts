import { api } from "@/lib/api/axios";

export const deleteUser = async (id: string | number) => {
  const response = await api.delete(`/users/${id}`);

  return response.data;
};
