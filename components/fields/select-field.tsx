import { useFieldContext } from "@/hooks/use-app-form";
import { FieldInfo } from "../field-info";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectField({
  label,
  placeholder,
  options,
  disabled,
}: {
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
}) {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-between-items-xs">
      <Label htmlFor={field.name}>{label}</Label>

      <Select
        value={field.state.value}
        onValueChange={field.handleChange}
        disabled={disabled}
      >
        <SelectTrigger id={field.name} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FieldInfo field={field} />
    </div>
  );
}
