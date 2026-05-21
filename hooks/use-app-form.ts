"use client";

import SubmitButton from "@/components/buttons/submit-button";
import SelectField from "@/components/fields/select-field";
import TextField from "@/components/fields/text-field";
import TextareaField from "@/components/fields/textarea-field";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
  },
  formComponents: { SubmitButton },
});
