import { useFieldContext } from "@/hooks/use-app-form";
import { formatNumber } from "@/lib/format/currency";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldInfo } from "../field-info";
import { Field, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";

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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field className={cn(className)}>
      <div className="flex justify-between items-center">
        <FieldLabel>{label}</FieldLabel>

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
          type={showPassword ? "text" : type}
          disabled={isDisabled}
          readOnly={readOnly}
        />

        {type === "password" && (
          <InputGroupAddon align={"inline-end"}>
            <InputGroupButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <Eye /> : <EyeOff />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    </Field>
  );
}
