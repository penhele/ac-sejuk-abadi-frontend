import { useFieldContext } from "@/hooks/use-app-form";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { FieldInfo } from "../field-info";

export default function ComboboxField({
  label,
  items,
  className,
}: {
  label: string;
  items: { id: string; name: string }[];
  className?: string;
}) {
  const field = useFieldContext<string[]>();

  return (
    <div className={cn("space-y-between-items-xs", className)}>
      <div className="flex justify-between items-center">
        <Label htmlFor={field.name}>{label}</Label>

        <FieldInfo field={field} />
      </div>

      <Combobox
        multiple
        items={items}
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        <ComboboxInput placeholder="Select " />
        <ComboboxContent>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item.id}>
                {item.name}
              </ComboboxItem>                                     
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
