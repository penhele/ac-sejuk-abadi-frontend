import { useFieldContext } from "@/hooks/use-app-form";
import { FieldInfo } from "../field-info";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "../ui/input-group";

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
      <Label>{label}</Label>
      <InputGroup>
        {isPrice && (
          <InputGroupAddon>
            <InputGroupText>IDR</InputGroupText>
          </InputGroupAddon>
        )}

        <InputGroupInput
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder={placeholder}
          type={type}
        />
      </InputGroup>
      <FieldInfo field={field} />
    </div>
  );
}
