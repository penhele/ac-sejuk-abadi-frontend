import { api } from "@/lib/api/axios";
import { CreateBrandPayload } from "@/types/brand";

export const addBrand = async (data: CreateBrandPayload) => {
  const response = await api.post("/brands", data);

  return response.data;
};

export const deleteBrand = async (id: string | number) => {
  const response = await api.delete(`/brands/${id}`);

  return response.data;
};
