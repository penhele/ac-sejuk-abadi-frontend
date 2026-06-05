import { api } from "@/lib/api/axios";
import { UpdateAcTypePayload } from "../types/update-ac-type-payload";

export const updateAcType = async (
  id: string | number,
  data: UpdateAcTypePayload,
) => {
  const response = await api.post(`/ac-types/${id}`, data);

  return response.data;
};
