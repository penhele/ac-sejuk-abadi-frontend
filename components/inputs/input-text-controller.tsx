import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export const InputTextController = <T extends FieldValues>({
  label,
  name,
  placeholder = "",
  control,
  isPassword = false,
}: {
  label: string;
  name: Path<T>;
  placeholder?: string;
  control: Control<T>;
  isPassword?: boolean;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel>{label}</FieldLabel>
          <Input
            {...field}
            value={field.value}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            type={isPassword ? "password" : "text"}
            required
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};
