import { useQuery } from "@tanstack/react-query";
import { getCompanyQueryOptions } from "../queries/company-queries";

export const useCompany = () => {
  return useQuery(getCompanyQueryOptions());
};
