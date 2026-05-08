"use client";

import useProductFilters from "@/hooks/use-product-filters";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SORT_OPTIONS = {
  CHEAPEST: "price-asc",
  MOST_EXPENSIVE: "price-desc",
  NONE: "none",
} as const;

export default function SortByPriceFilter() {
  const { sortBy, sortOrder, setFilters } = useProductFilters();

  const currentValue =
    sortBy && sortOrder ? `${sortBy}-${sortOrder}` : SORT_OPTIONS.NONE;

  const handleSortChange = (value: string) => {
    if (value === SORT_OPTIONS.CHEAPEST) {
      setFilters({ sortBy: "price", sortOrder: "asc" });
    } else if (value === SORT_OPTIONS.MOST_EXPENSIVE) {
      setFilters({ sortBy: "price", sortOrder: "desc" });
    } else if (value === SORT_OPTIONS.NONE) {
      setFilters({ sortBy: undefined, sortOrder: undefined });
    }
  };

  return (
    <Select value={currentValue} onValueChange={handleSortChange}>
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder="Urutkan berdasarkan" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem value={SORT_OPTIONS.NONE}>Default (Terbaru)</SelectItem>

          <SelectSeparator />

          <SelectItem value={SORT_OPTIONS.CHEAPEST}>Harga termurah</SelectItem>
          <SelectItem value={SORT_OPTIONS.MOST_EXPENSIVE}>
            Harga termahal
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
