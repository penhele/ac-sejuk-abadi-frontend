"use client";

import { formatRupiah } from "@/lib/format/currency";
import { Slider } from "../ui/slider";
import { useEffect, useState } from "react";
import useProductFilters from "@/hooks/use-product-filters";
import useDebounce from "@/hooks/use-debounce";
import { Button } from "../ui/button";

export default function RangePriceFilter() {
  const { min_price, max_price, setFilters } = useProductFilters();

  const MIN_LIMIT = 0;
  const MAX_LIMIT = 20000000;
  const STEP = 100000;

  const [value, setValue] = useState<number[]>([
    Number(min_price) || MIN_LIMIT,
    Number(max_price) || MAX_LIMIT,
  ]);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const isDefault =
      debouncedValue[0] === MIN_LIMIT && debouncedValue[1] === MAX_LIMIT;

    if (isDefault) {
      setFilters({ min_price: undefined, max_price: undefined });
    } else {
      setFilters({
        min_price: debouncedValue[0].toString(),
        max_price: debouncedValue[1].toString(),
      });
    }
  }, [debouncedValue, setFilters]);

  const handleReset = () => {
    const defaultRange = [MIN_LIMIT, MAX_LIMIT];
    setValue(defaultRange);
    setFilters({ min_price: undefined, max_price: undefined });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center h-4">
        <span className="font-medium text-sm">Price</span>

        <Button
          className=""
          variant={"ghost"}
          size={"xs"}
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <Slider
          value={value}
          onValueChange={setValue}
          min={MIN_LIMIT}
          max={MAX_LIMIT}
          step={STEP}
          className="mx-auto w-full max-w-xs"
        />

        <div className="flex justify-between text-sm">
          <span>{formatRupiah(value[0])}</span>
          <span>{formatRupiah(value[1])}</span>
        </div>
      </div>
    </div>
  );
}
