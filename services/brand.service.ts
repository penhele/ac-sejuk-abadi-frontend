import { api } from "@/lib/axios";
import { Brand } from "@/types/brand";

export const getBrands = async (): Promise<Brand[]> => {
  const response = await api.get<Brand[]>("/brands");

  return response.data;
};
