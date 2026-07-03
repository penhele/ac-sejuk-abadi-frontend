"use client";

import SubmitButton from "@/components/buttons/submit-button";
import CalendarField from "@/components/fields/calendar-field";
import ComboboxField from "@/components/fields/combobox-field";
import ImageField from "@/components/fields/image-field";
import SelectField from "@/components/fields/select-field";
import InputField from "@/components/fields/text-field";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputField,
    SelectField,
    CalendarField,
    ComboboxField,
    ImageField,
  },
  formComponents: { SubmitButton },
});
