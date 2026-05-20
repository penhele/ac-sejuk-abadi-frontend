import { api } from "@/lib/api/axios";
import { Brand, SponsoredBrand } from "@/types/brand";

export const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await api.get<Brand[]>("/brands");

    return response.data;
  } catch (error) {
    return [];
  }
};

export const getSponsoredBrands = async (): Promise<SponsoredBrand[]> => {
  try {
    const response = await api.get<SponsoredBrand[]>("/sponsored-brands");

    return response.data;
  } catch (error) {
    return [];
  }
};
