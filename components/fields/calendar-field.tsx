import { useFieldContext } from "@/hooks/use-app-form";
import { formatDate } from "@/lib/format/date";
import { parseISO } from "date-fns";
import { CalendarFold } from "lucide-react";
import { FieldInfo } from "../field-info";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";

export default function CalendarField({
  label,
  placeholder = "Pick a date",
}: {
  label: string;
  placeholder?: string;
}) {
  const field = useFieldContext<string>();

  const currentValue = field.state.value
    ? parseISO(field.state.value)
    : undefined;

  return (
    <div className="space-y-between-items-xs">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>

        <FieldInfo field={field} />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "text-left justify-start w-full flex",
              !currentValue &&
                "text-muted-foreground hover:text-muted-foreground",
            )}
            variant={"outline"}
          >
            <CalendarFold />
            {currentValue ? formatDate(currentValue.toString()) : placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <Calendar
            selected={currentValue}
            onSelect={(selectedDate: Date | undefined) => {
              if (selectedDate) {
                field.handleChange(selectedDate.toISOString());
              }
            }}
            mode="single"
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
