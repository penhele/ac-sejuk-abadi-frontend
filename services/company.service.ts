import { api } from "@/lib/axios";
import { Company } from "@/types/company";

export const getCompany = async (): Promise<Company> => {
  const response = await api.get<Company>("/company");

  return response.data;
};