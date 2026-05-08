import { GetProductOptions } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search =
    (searchParams.get("search") as GetProductOptions["search"]) ?? undefined;
  const sortBy =
    (searchParams.get("sortBy") as GetProductOptions["sortBy"]) ?? undefined;
  const sortOrder =
    (searchParams.get("sortOrder") as GetProductOptions["sortOrder"]) ??
    undefined;
  const id_brand =
    (searchParams.get("id_brand") as GetProductOptions["id_category"]) ??
    undefined;

  const setFilters = useCallback(
    (filters: GetProductOptions) => {
      const params = new URLSearchParams(searchParams.toString());

      const applyFilter = (key: string, value: any) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      };

      if ("search" in filters) applyFilter("search", filters.search);
      if ("sortBy" in filters) applyFilter("sortBy", filters.sortBy);
      if ("sortOrder" in filters) applyFilter("sortOrder", filters.sortOrder);
      if ("id_brand" in filters) applyFilter("id_brand", filters.id_brand);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return {
    search,
    sortBy,
    sortOrder,
    id_brand,
    setFilters,
  };
}
