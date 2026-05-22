"use client";

import { getCompanyQueryOptions } from "@/hooks/queries/company-queries";
import { useAppForm } from "@/hooks/use-app-form";
import { updateCompany } from "@/services/company.service";
import { UpdateCompanyPayload } from "@/types/company";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function EditCompanyForm() {
  const { data: company } = useQuery(getCompanyQueryOptions());
  const [isEditing, setIsEditing] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UpdateCompanyPayload) => updateCompany(data),
    onSuccess(data, variables, onMutateResult, context) {
      toast.success("Berhasil memperbarui data");
    },
    onError(error, variables, onMutateResult, context) {
      toast.error(error.message);
    },
  });

  const form = useAppForm({
    defaultValues: {
      logo_url: company?.logo_url ?? "",
      name: company?.name ?? "",
      description: company?.description ?? "",
      email: company?.email ?? "",
      phone: company?.phone ?? "",
      location: company?.location ?? "",
      location_url: company?.location_url ?? "",
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-between-items w-full"
      >
        <form.AppField
          name="name"
          children={(field) => {
            return <field.TextField label="Company" isDisabled={isPending} />;
          }}
        />

        <form.AppField
          name="description"
          children={(field) => {
            return (
              <field.TextareaField label="Description" isDisabled={isPending} />
            );
          }}
        />

        <div className="flex flex-row space-x-between-items">
          <form.AppField
            name="email"
            children={(field) => {
              return (
                <field.TextField
                  isDisabled={isPending}
                  label="Email"
                  type="email"
                  className="flex-1"
                />
              );
            }}
          />

          <form.AppField
            name="phone"
            children={(field) => {
              return (
                <field.TextField
                  isDisabled={isPending}
                  label="Phone"
                  type="number"
                  placeholder="62818355788"
                  className="flex-1"
                />
              );
            }}
          />
        </div>

        <form.AppField
          name="location"
          children={(field) => {
            return <field.TextField isDisabled={isPending} label="Location" />;
          }}
        />

        <form.AppField
          name="location_url"
          children={(field) => {
            return (
              <field.TextField isDisabled={isPending} label="Location URL" />
            );
          }}
        />

        <form.SubmitButton label="Update" className="w-full" />
      </form>
    </form.AppForm>
  );
}
