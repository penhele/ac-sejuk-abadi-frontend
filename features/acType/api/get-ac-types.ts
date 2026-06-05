import { api } from "@/lib/api/axios";
import { AcType } from "../types/ac-type";

export const getAcTypes = async (): Promise<AcType[]> => {
  const response = await api.get("/ac-types");

  return response.data;
};
