"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";

export default function SearchBar() {
  return (
    <form action="">
      <ButtonGroup className="xs:flex hidden">
        <Input placeholder="Cari produk..." />
        <Button variant="outline" aria-label="Search">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </form>
  );
}
