import { api } from "@/lib/api/axios";

export const deleteBrand = async (id: string | number) => {
  const response = await api.delete(`/brands/${id}`);

  return response.data;
};
