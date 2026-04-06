"use client";

import { SearchIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "Cari Produk...",
  defaultValue = "",
  onChange,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleClear = () => {
    setValue("");
  };

  return (
    <ButtonGroup className={cn("xs:flex hidden", className)}>
      <div className="relative ">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className=""
        />
        {value && (
          <Button
            onClick={handleClear}
            className="absolute right-0"
            variant={"ghost"}
          >
            <X />
          </Button>
        )}
      </div>
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
