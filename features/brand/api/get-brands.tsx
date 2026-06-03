import { api } from "@/lib/api/axios";
import { Brand } from "../types/brand";

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await api.get<Brand[]>("/brands");

    return response.data;
  } catch (error) {
    return [];
  }
};
