import { useFieldContext } from "@/hooks/use-app-form";
import { FieldInfo } from "../field-info";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function TextField({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();

  console.log(field.state.meta.isTouched);
  console.log(field.state.meta.isValid);

  return (
    <div className="space-y-between-items-xs">
      <Label>{label}</Label>
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
      />

      {/* <FieldInfo field={field} /> */}
    </div>
  );
}
