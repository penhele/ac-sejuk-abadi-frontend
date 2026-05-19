import { getCompany } from "@/services/company.service";
import { queryOptions } from "@tanstack/react-query";

export const getCompanyQueryOptions = queryOptions({
  queryKey: ["company"],
  queryFn: getCompany,
  staleTime: 1000 * 60 * 5,
});
