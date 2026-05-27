import { useFieldContext } from "@/hooks/use-app-form";
import { FieldInfo } from "../field-info";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { readonly } from "zod";

export default function TextField({
  label,
  placeholder,
  isDisabled,
  readOnly,
  className,
}: {
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  readOnly?: boolean;
  className?: string;
}) {
  const field = useFieldContext<string>();

  return (
    <div className={cn("space-y-between-items-xs", className)}>
      <div className="flex justify-between items-center">
        <Label>{label}</Label>

        <FieldInfo field={field} />
      </div>
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
        readOnly={readOnly}
      />
    </div>
  );
}
