import { api } from "@/lib/api/axios";
import { UpdateBannerPayload } from "../types/update-banner-payload";

export const updateBanner = async (
  id: string | number,
  data: UpdateBannerPayload,
) => {
  const response = await api.put(`/banners/${id}`, data);

  return response.data;
};
