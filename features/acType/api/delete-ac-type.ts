import { api } from "@/lib/api/axios";

export const deleteAcType = async (id: string | number) => {
  const response = await api.delete(`/ac-types/${id}`);

  return response.data;
};
