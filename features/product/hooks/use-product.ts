import { getProductByIdQueryOptions } from "@/features/queries/product-queries";
import { useQuery } from "@tanstack/react-query";

export default function useProduct(id: string | number) {
  return useQuery(getProductByIdQueryOptions(id));
}
