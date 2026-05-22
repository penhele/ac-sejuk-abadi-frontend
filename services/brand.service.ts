import { api } from "@/lib/api/axios";
import { Brand, CreateBrandPayload, SponsoredBrand } from "@/types/brand";

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await api.get<Brand[]>("/brands");

    return response.data;
  } catch (error) {
    return [];
  }
};

export const addBrand = async (data: CreateBrandPayload) => {
  const response = await api.post("/brands", data);

  return response.data;
};

export const deleteBrand = async (id: string | number) => {
  const response = await api.delete(`/brands/${id}`);

  return response.data;
};

export const getSponsoredBrands = async (): Promise<SponsoredBrand[]> => {
  try {
    const response = await api.get<SponsoredBrand[]>("/sponsored-brands");

    return response.data;
  } catch (error) {
    return [];
  }
};
