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
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

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
        <ComboboxInput placeholder="Select products" />

        <ComboboxContent>
          <ComboboxList>
            {items.map((item) => (
              <ComboboxItem key={item.id} value={item.id}>
                {item.name}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <div className="flex flex-col gap-between-items-xs">
        {field.state.value?.map((id) => {
          const selectedItem = items.find((i) => i.id === id);

          return (
            <InputGroup key={id}>
              <InputGroupInput
                readOnly
                value={selectedItem ? selectedItem.name : id}
              />

              <InputGroupAddon align={"inline-end"}>
                <InputGroupButton
                  size={"icon-xs"}
                  onClick={() => {
                    field.handleChange(
                      field.state.value.filter((value) => value !== id),
                    );
                  }}
                >
                  <X />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          );
        })}
      </div>

      {/* <div className="flex flex-col mt-2 gap-1">
        {field.state.value?.map((id, index) => {
          // Cari item di dalam array 'items' yang id-nya cocok
          const selectedItem = items.find((i) => i.id === id);

          // Tampilkan name jika ketemu, kalau tidak ketemu fallback ke id
          return (
            <span key={id || index} className="text-sm text-muted-foreground">
              {selectedItem ? selectedItem.name : id}
            </span>
          );
        })}
      </div> */}
    </div>
  );
}
