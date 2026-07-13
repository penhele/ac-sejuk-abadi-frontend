import { useFieldContext } from "@/hooks/use-app-form";
import { formatDate } from "@/lib/format/date";
import { cn } from "@/lib/utils";
import { parseISO } from "date-fns";
import { CalendarFold } from "lucide-react";
import { FieldInfo } from "../field-info";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Field, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  isOptional?: boolean;
}

export default function CalendarField({
  label,
  placeholder = "Pick a date",
  isDisabled,
  isOptional,
}: Props) {
  const field = useFieldContext<string>();

  const currentValue = field.state.value
    ? parseISO(field.state.value)
    : undefined;

  return (
    <Field>
      <div className="flex justify-between items-center">
        <FieldLabel>
          <div>
            {label} {!isOptional && <span className="text-red-600">*</span>}
          </div>
        </FieldLabel>
        <FieldInfo field={field} />
      </div>

      <Popover>
        <PopoverTrigger asChild disabled={isDisabled}>
          <Button
            className={cn(
              "text-left justify-start w-full flex font-normal",
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
            disabled={(date) =>
              date > new Date(new Date().setHours(0, 0, 0, 0))
            }
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
