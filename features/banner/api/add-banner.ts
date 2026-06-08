import { api } from "@/lib/api/axios";
import { CreateBannerPayload } from "../types/create-banner-payload";

export const addBanner = async (data: CreateBannerPayload) => {
  const response = await api.post("/banners", data);

  return response.data;
};
