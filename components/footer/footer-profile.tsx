"use client";

import Image from "next/image";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getCompanyQueryOptions } from "@/hooks/queries/company-queries";

export default function FooterProfile({ className }: { className?: string }) {
  const { data: response } = useQuery(getCompanyQueryOptions());

  const company = response;

  return (
    <div className={cn("space-y-between-items-xs", className)}>
      <div className="relative h-16 w-32">
        <Image
          src={company?.logo_url || "/logo.png"}
          alt={`logo-${company?.name}`}
          fill
          className="object-contain"
        />
      </div>

      <Separator />

      <p className="text-sm leading-relaxed text-gray-600">
        {company?.description}
      </p>
    </div>
  );
}
