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

export default function TextField({
  label,
  type = "text",
  placeholder,
  isPrice,
}: {
  label: string;
  type?: "text" | "number" | "password" | "email";
  placeholder?: string;
  isPrice?: boolean;
}) {
  const field = useFieldContext<string>();

  return (
    <div className="space-y-between-items-xs">
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
        />
      </InputGroup>
    </div>
  );
}
