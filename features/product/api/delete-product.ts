import { api } from "@/lib/api/axios";

export const deleteProduct = async (id: string | number) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};
