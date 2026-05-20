import { api } from "@/lib/api/axios";
import { Banner } from "@/types/banner";

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const response = await api.get("/banners");

    return response.data;
  } catch (error) {
    return [];
  }
};
