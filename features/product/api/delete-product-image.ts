import { api } from "@/lib/api/axios";

export const deleteProductImage = async (
  idProduct: string | number,
  idImage: string | number,
) => {
  const response = await api.delete(`/products/${idProduct}/images/${idImage}`);

  return response.data;
};
