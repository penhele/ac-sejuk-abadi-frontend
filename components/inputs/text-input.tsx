import { Input } from "../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function TextInput({
  label,
  placeholder,
  isPrice,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  isPrice?: boolean;
  type?: "number" | "text";
}) {
  return (
    <div className="space-y-between-items-xs">
      <Label>{label}</Label>
      <InputGroup>
        {isPrice && (
          <InputGroupAddon>
            <InputGroupText>IDR</InputGroupText>
          </InputGroupAddon>
        )}

        <InputGroupInput placeholder={placeholder} type={type} />
      </InputGroup>
    </div>
  );
}

export function TextareaInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-between-items-xs">
      <Label>{label}</Label>
      <Textarea className="h-full" placeholder={placeholder} />
    </div>
  );
}
