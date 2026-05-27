import { useFieldContext } from "@/hooks/use-app-form";
import { formatNumber } from "@/lib/format/currency";
import { FieldInfo } from "../field-info";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export default function TextField({
  label,
  type = "text",
  placeholder,
  isPrice,
  className,
  isDisabled,
  readOnly,
}: {
  label: string;
  type?: "text" | "number" | "password" | "email";
  placeholder?: string;
  isPrice?: boolean;
  className?: string;
  isDisabled?: boolean;
  readOnly?: boolean;
}) {
  const field = useFieldContext<string>();

  return (
    <div className={cn("space-y-between-items-xs", className)}>
      <div className="flex justify-between items-center">
        <Label>{label}</Label>

        <FieldInfo field={field} />
      </div>

      <InputGroup>
        {isPrice && (
          <InputGroupAddon>
            <InputGroupText>IDR</InputGroupText>
          </InputGroupAddon>
        )}

        <InputGroupInput
          value={isPrice ? formatNumber(field.state.value) : field.state.value}
          onChange={(e) => {
            if (isPrice) {
              const rawValue = e.target.value.replace(/\D/g, "");

              field.handleChange(rawValue);
            } else {
              field.handleChange(e.target.value);
            }
          }}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          type={isPrice ? "text" : type}
          disabled={isDisabled}
          readOnly={readOnly}
        />
      </InputGroup>
    </div>
  );
}
