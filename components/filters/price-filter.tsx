"use client";

import { useState } from "react";
import { Slider } from "../ui/slider";
import { formatRupiah } from "@/lib/format/currency";

export default function PriceFilter() {
  const MIN_PRICE = 0;
  const MAX_PRICE = 15000000;
  const STEP = 100000;

  const [value, setValue] = useState([MIN_PRICE, MAX_PRICE]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-sm">Price</h1>
        <span className="text-xs text-gray-400 cursor-pointer transition-colors hover:text-primary">
          Reset
        </span>
      </div>

      <div className="space-y-2">
        <Slider
          value={value}
          onValueChange={setValue}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
          className="mx-auto w-full max-w-xs"
        />

        <div className="flex justify-between text-sm">
          <span>{value[0]}</span>
          <span>{formatRupiah(value[1])}</span>
        </div>
      </div>
    </div>
  );
}
