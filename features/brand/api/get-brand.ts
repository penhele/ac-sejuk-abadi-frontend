import { api } from "@/lib/api/axios";
import { Brand } from "../types/brand";

export const getBrand = async (id: string | number):Promise<Brand> => {
  const response = await api.get(`/brands/${id}`);

  return response.data
};
