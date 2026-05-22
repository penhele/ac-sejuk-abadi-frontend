import { api } from "@/lib/api/axios";
import { Company, UpdateCompanyPayload } from "@/types/company";

export const getCompany = async (): Promise<Company> => {
  const response = await api.get<Company>("/company");

  return response.data;
};

export const updateCompany = async (data: UpdateCompanyPayload) => {
  const response = await api.put("company", data);

  return response.data;
};
