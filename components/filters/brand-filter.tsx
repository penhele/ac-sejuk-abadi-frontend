import { Brand } from "@/types/brand";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function BrandFilter({ brands }: { brands: Brand[] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-sm">Brands</h1>
        <span className="text-xs text-gray-400 cursor-pointer transition-colors hover:text-primary">
          Reset
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {brands.map((brand) => (
          <div key={brand.id} className="flex justify-between cursor-pointer">
            <div className="flex gap-2">
              <Checkbox value={brand.id} id={brand.id.toString()} />
              <Label htmlFor={brand.id.toString()} className="text-xs">
                {brand.name}
              </Label>
            </div>

            <span className="text-gray-400 text-xs">
              {brand._count.products}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
