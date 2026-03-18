import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function CheckboxFilter({
  title,
  listFilter,
}: {
  title: string;
  listFilter: { id: string; name: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-sm">{title}</h1>
        <span className="text-xs text-gray-400 cursor-pointer">Reset</span>
      </div>

      <div className="flex flex-col gap-2">
        {listFilter.map((item) => (
          <div key={item.id} className="flex justify-between cursor-pointer">
            <div className="flex gap-2">
              <Checkbox value={item.id} id={item.id} />
              <Label htmlFor={item.id} className="text-xs">
                {item.name}
              </Label>
            </div>

            <span className="text-gray-400 text-xs">14</span>
          </div>
        ))}
      </div>
    </div>
  );
}
