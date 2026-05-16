import { GetProductOptions } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

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
  const min_price =
    (searchParams.get("min_price") as GetProductOptions["min_price"]) ??
    undefined;
  const max_price =
    (searchParams.get("max_price") as GetProductOptions["max_price"]) ??
    undefined;

  const setFilters = useCallback(
    (filters: GetProductOptions) => {
      const params = new URLSearchParams(window.location.search);

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
      if ("min_price" in filters) applyFilter("min_price", filters.min_price);
      if ("max_price" in filters) applyFilter("max_price", filters.max_price);

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router],
  );

  return {
    search,
    sortBy,
    sortOrder,
    id_brand,
    min_price,
    max_price,
    setFilters,
  };
}
