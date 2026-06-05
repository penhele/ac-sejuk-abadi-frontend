import { api } from "@/lib/api/axios";
import { CreateAcTypePayload } from "../types/create-ac-type-payload";

export const addAcType = async (data: CreateAcTypePayload) => {
  const response = await api.post("/ac-types", data);

  return response.data;
};
