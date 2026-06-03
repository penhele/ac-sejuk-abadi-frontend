import { useFieldContext } from "@/hooks/use-app-form";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { FieldInfo } from "../field-info";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Label } from "../ui/label";
import useDebounce from "@/hooks/use-debounce";
import { useState, useEffect } from "react";

export default function ComboboxField({
  label,
  items,
  className,
  initialSearchValue = "",
  onDebouncedSearchChange,
}: {
  label: string;
  items: { id: string; name: string }[];
  className?: string;
  initialSearchValue?: string;
  onDebouncedSearchChange?: (value: string) => void;
}) {
  const field = useFieldContext<string[]>();

  // 1. Kelola state pengetikan secara mandiri di sini
  const [localSearch, setLocalSearch] = useState(initialSearchValue);
  const debouncedSearch = useDebounce(localSearch, 500);

  // 2. Trigger fungsi pencarian ke luar hanya ketika debounce selesai
  useEffect(() => {
    onDebouncedSearchChange?.(debouncedSearch);
  }, [debouncedSearch, onDebouncedSearchChange]);

  return (
    <div className={cn("space-y-between-items-xs", className)}>
      <div className="flex justify-between items-center">
        <Label htmlFor={field.name}>{label}</Label>

        <FieldInfo field={field} />
      </div>

      <Combobox
        items={items}
        multiple
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        <ComboboxInput
          placeholder="Select products"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.id} value={item.id}>
                {item.name}
              </ComboboxItem>
            )}
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
    </div>
  );
}
