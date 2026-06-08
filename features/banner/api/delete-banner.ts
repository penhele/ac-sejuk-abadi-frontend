import { api } from "@/lib/api/axios";

export const deleteBanner = async (id: string | number) => {
  const response = await api.delete(`/banners/${id}`);

  return response.data;
};
