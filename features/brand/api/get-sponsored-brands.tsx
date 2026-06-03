import { api } from "@/lib/api/axios";
import { SponsoredBrand } from "../types/sponsored-brand";

export const getSponsoredBrands = async (): Promise<SponsoredBrand[]> => {
  try {
    const response = await api.get<SponsoredBrand[]>("/sponsored-brands");

    return response.data;
  } catch (error) {
    return [];
  }
};
