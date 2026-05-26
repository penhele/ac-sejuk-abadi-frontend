"use client";

import { getCompanyQueryOptions } from "@/hooks/queries/company-queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Spinner } from "../../ui/spinner";

export default function EditCompanyImageForm() {
  const { data: company } = useQuery(getCompanyQueryOptions());

  return (
    <div
      className={cn(
        "relative aspect-square border-2 bg-muted/50 border-dashed rounded-lg flex items-center justify-center",
        company?.logo_url && "bg-white",
      )}
    >
      {company?.logo_url ? (
        <Image
          src={company?.logo_url}
          alt={`logo-${company?.name}` || "logo"}
          fill
          className="object-contain"
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
