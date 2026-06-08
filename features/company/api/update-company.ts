import { api } from "@/lib/api/axios";
import { UpdateCompanyPayload } from "../types/update-company-payload";

export const updateCompany = async (data: UpdateCompanyPayload) => {
  const response = await api.put("company", data);

  return response.data;
};
