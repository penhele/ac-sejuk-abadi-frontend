import { useFieldContext } from "@/hooks/use-app-form";
import { FieldInfo } from "../field-info";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function TextField({
  label,
  isDisable = false,
}: {
  label: string;
  isDisable?: boolean;
}) {
  const field = useFieldContext<string>();

  return (
    <Field className="">
      <FieldLabel>{label}</FieldLabel>
      <Input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        disabled={isDisable}
      />
      <FieldInfo field={field} />
    </Field>
  );
}
