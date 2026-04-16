"use client";

import { useState } from "react";
import { Slider } from "../ui/slider";
import { formatRupiah } from "../util/formatter";

export default function PriceFilter() {
  const [value, setValue] = useState([0, 10000000]);

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
          min={0}
          max={10000000}
          step={50000}
          className="mx-auto w-full max-w-xs"
        />

        <div className="flex justify-between text-sm">
          <span>{value[0]}</span>
          <span>{formatRupiah(value[1].toString())}</span>
        </div>
      </div>
    </div>
  );
}
