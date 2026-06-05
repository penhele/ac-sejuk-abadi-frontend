import { api } from "@/lib/api/axios";
import { CreateBrandPayload } from "../types/create-brand-payload";

export const addBrand = async (data: CreateBrandPayload) => {
  const response = await api.post("/brands", data);

  return response.data;
};
