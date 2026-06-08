"use client";

import { useMe } from "@/features/auth/hooks/use-me";
import { useCompany } from "@/features/company/hooks/use-company";
import Image from "next/image";

export default function Header() {
  const { data: me } = useMe();
  const { data: company } = useCompany();

  return (
    <div className="border-b sticky top-0 p-4 backdrop-blur-lg z-30 flex flex-row justify-between h-20 bg-background/80">
      <div className="flex flex-row items-center space-x-4">
        <div className="relative h-12 w-12">
          {company?.logo_url && (
            <Image
              alt={`${company.name}-logo`}
              src={company.logo_url}
              fill
              className="object-contain"
            />
          )}
        </div>

        <span className="text-xl tracking-widest font-semibold text-primary">Dashboard</span>
      </div>

      <div className="flex flex-row space-x-4 items-center justify-center">
        <div className="aspect-square rounded-full h-full flex items-center justify-center bg-indigo-200">
          <span className="text-indigo-600 font-bold">
            {me?.first_name[0].toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold">{me?.first_name}</span>
          <span className="text-xs text-muted-foreground">{me?.email}</span>
        </div>
      </div>
    </div>
  );
}
