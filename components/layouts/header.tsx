"use client";

import { useMe } from "@/features/auth/hooks/use-me";
import { useCompany } from "@/features/company/hooks/use-company";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Settings, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { data: me } = useMe();
  const { data: company } = useCompany();

  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  console.log(theme);

  return (
    <div className="border-b sticky top-0 p-4 backdrop-blur-lg z-30 flex flex-row bg-background/80">
      {/* <div className="flex flex-row space-x-4 items-center justify-center">
        <div className="aspect-square rounded-full h-full flex items-center justify-center bg-indigo-200">
          <span className="text-indigo-600 font-bold">
            {me?.first_name[0].toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-semibold">{me?.first_name}</span>
          <span className="text-xs text-muted-foreground">{me?.email}</span>
        </div>
      </div> */}

      <Button size={"icon-sm"} variant={"ghost"} onClick={handleTheme}>
        {theme === "light" ? <Sun /> : <Moon />}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon-sm"}>
            S
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-3xs">
          <DropdownMenuGroup>
            <div className="px-2 py-1.5 flex flex-col">
              <span className="text-sm">{me?.first_name}</span>
              <span className="text-xs text-muted-foreground">{me?.email}</span>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Settings /> Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
