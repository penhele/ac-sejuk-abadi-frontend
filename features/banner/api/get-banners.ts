import { api } from "@/lib/api/axios";

export const getBanners = async () => {
  const response = await api.get("/banners");

  return response.data;
};
