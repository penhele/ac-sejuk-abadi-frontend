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
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "../ui/field";

export default function SelectField({
  label,
  placeholder,
  options,
  disabled,
  className,
}: {
  label: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  className?: string;
}) {
  const field = useFieldContext<string>();

  return (
    <Field className={cn(className)}>
      <div className="flex justify-between items-center">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

        <FieldInfo field={field} />
      </div>

      <Select
        value={field.state.value}
        onValueChange={field.handleChange}
        onOpenChange={(open) => {
          if (!open) {
            field.handleBlur();
          }
        }}
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
    </Field>
  );
}
