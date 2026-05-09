import { useFieldContext } from "@/hooks/use-app-form";
import { FieldInfo } from "../field-info";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function TextField({
  label,
  isDisable = false,
  type = "text",
  isEditing,
}: {
  label: string;
  isDisable?: boolean;
  type?: "text" | "number" | "password" | "email";
  isEditing?: boolean;
}) {
  const field = useFieldContext<string>();

  return (
    <Field className="flex flex-row justify-between">
      <FieldLabel className="text-gray-400 w-fit ">{label}</FieldLabel>
      {!isEditing ? (
        <span className="h-9 flex items-center justify-end text-foreground text-base md:text-sm text-end font-medium px-2.5 whitespace-nowrap">
          {field.state.value}
        </span>
      ) : (
        <Input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={isDisable}
          type={type}
          className="disabled:text-gray-800 disabled:opacity-100 font-medium text-end"
        />
      )}
      <FieldInfo field={field} />
    </Field>
  );
}
