import { GetProductOptions } from "@/types/product";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search =
    (searchParams.get("search") as GetProductOptions["search"]) ?? undefined;

  const setFilters = useCallback(
    (filters: GetProductOptions) => {
      const params = new URLSearchParams(searchParams.toString());

      if (filters.search) {
        params.set("search", filters.search);
      } else {
        params.delete("search");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router],
  );

  return {
    search,
    setFilters,
  };
}
