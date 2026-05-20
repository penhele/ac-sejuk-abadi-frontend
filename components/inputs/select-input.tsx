import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-between-items-xs">
      <Label>{label}</Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="11">Inverter</SelectItem>
          <SelectItem value="12">Standard</SelectItem>
          <SelectItem value="13">Low Watt</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
