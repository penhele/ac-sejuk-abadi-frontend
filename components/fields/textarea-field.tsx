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

  return (
    <div className="space-y-between-items-xs">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>

        <FieldInfo field={field} />
      </div>
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
