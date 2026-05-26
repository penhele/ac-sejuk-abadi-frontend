import { api } from "@/lib/api/axios";
import { AcType, CreateAcTypePayload } from "@/types/ac-type";

export const getTypes = async (): Promise<AcType[]> => {
  const response = await api.get("/ac-types");

  return response.data;
};

export const addAcType = async (data: CreateAcTypePayload) => {
  const response = await api.post("/ac-types", data);

  return response.data;
};

export const deleteAcType = async (id: string | number) => {
  const response = await api.delete(`/ac-types/${id}`);

  return response.data;
};
