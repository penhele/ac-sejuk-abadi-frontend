import { api } from "@/lib/api/axios";
import { AcType } from "../types/ac-type";

export const getAcType = async (id: string | number): Promise<AcType> => {
  const response = await api.get(`/ac-types/${id}`);

  return response.data;
};
