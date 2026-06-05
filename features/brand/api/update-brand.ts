import { api } from "@/lib/api/axios";
import { UpdateBrandPayload } from "../types/update-brand-payload";

export const updateBrand = async (
  id: string | number,
  data: UpdateBrandPayload,
) => {
  const response = await api.put(`/brands/${id}`, data);

  return response.data;
};
