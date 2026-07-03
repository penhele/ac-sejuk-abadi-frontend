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
  const MAX_LIMIT = 30000000;
  const STEP = 100000;

  const [value, setValue] = useState<number[]>([
    min_price ? Number(min_price) : MIN_LIMIT,
    max_price ? Number(max_price) : MAX_LIMIT,
  ]);

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setValue([
      min_price ? Number(min_price) : MIN_LIMIT,
      max_price ? Number(max_price) : MAX_LIMIT,
    ]);
  }, [min_price, max_price]);

  useEffect(() => {
    const [min, max] = debouncedValue;

    const newMin = min === MIN_LIMIT ? undefined : String(min);
    const newMax = max === MAX_LIMIT ? undefined : String(max);

    if (newMin === min_price && newMax === max_price) return;

    setFilters({
      min_price: newMin,
      max_price: newMax,
    });
  }, [debouncedValue, min_price, max_price, setFilters]);

  const handleReset = () => {
    setValue([MIN_LIMIT, MAX_LIMIT]);
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

      <div className="space-y-4">
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
