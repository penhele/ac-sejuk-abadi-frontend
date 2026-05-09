import { useFieldContext } from "@/hooks/use-app-form";
import { FieldInfo } from "../field-info";
import { Field, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

export default function TextareaField({
  label,
  isDisable = false,
}: {
  label: string;
  isDisable?: boolean;
}) {
  const field = useFieldContext<string>();

  return (
    <Field className="flex flex-row justify-between">
      <FieldLabel className="text-gray-400">{label}</FieldLabel>
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        disabled={isDisable}
        className="disabled:text-gray-800 disabled:opacity-100 font-medium text-end "
      />
      <FieldInfo field={field} />
    </Field>
  );
}
