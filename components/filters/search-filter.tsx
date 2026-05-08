"use client";

import useProductFilters from "@/hooks/use-product-filters";
import { GetProductOptions } from "@/types/product";
import { Search, X } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

export default function SearchFilter() {
  const { search, setFilters } = useProductFilters();

  const [localSearch, setLocalSearch] =
    useState<GetProductOptions["search"]>(search);

  const handleSearch = () => {
    setFilters({ search: localSearch });
  };

  const clearSearch = () => {
    setLocalSearch("");
    setFilters({ search: undefined });
  };

  return (
    <InputGroup className="max-w-3xs relative">
      <InputGroupInput
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Cari produk"
      />

      <InputGroupAddon onClick={handleSearch} className="hover:cursor-pointer">
        <Search />
      </InputGroupAddon>

      {localSearch && (
        <InputGroupAddon
          // align="inline-end"
          className="hover:cursor-pointer absolute right-3"
          onClick={clearSearch}
        >
          <X />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
