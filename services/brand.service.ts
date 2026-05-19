import { api } from "@/lib/api/axios";
import { Brand, SponsoredBrand } from "@/types/brand";

export const getBrands = async (): Promise<Brand[]> => {
  const response = await api.get<Brand[]>("/brands");

  return response.data;
};

export const getSponsoredBrands = async (): Promise<SponsoredBrand[]> => {
  const response = await api.get<SponsoredBrand[]>("/sponsored-brands");

  return response.data;
};
