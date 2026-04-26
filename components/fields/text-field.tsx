import { useFieldContext } from "@/hooks/use-app-form";
import { FieldInfo } from "../field-info";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function TextField({
  label,
  isDisable = false,
  type = "text",
}: {
  label: string;
  isDisable?: boolean;
  type?: "text" | "number";
}) {
  const field = useFieldContext<string>();

  return (
    <Field className="">
      <FieldLabel>{label}</FieldLabel>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        disabled={isDisable}
        type={type}
      />
      <FieldInfo field={field} />
    </Field>
  );
}
