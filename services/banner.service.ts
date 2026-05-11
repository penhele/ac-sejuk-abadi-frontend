import { api } from "@/lib/api/axios";
import { Banner } from "@/types/banner";

export const getBanners = async (): Promise<Banner[]> => {
  const response = await api.get("/banners");

  return response.data;
};
