import { queryOptions } from "@tanstack/react-query";
import { getCompany } from "../api/get-company";
import { companyKeys } from "./company-keys";

export const getCompanyQueryOptions = () => {
  return queryOptions({
    queryFn: getCompany,
    queryKey: companyKeys.all,
    staleTime: 1000 * 60 * 5,
  });
};
