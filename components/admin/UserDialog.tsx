"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function UserDialog({ open, setOpen, onSave }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleSubmit = () => {
    onSave(form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Pengguna</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Nama"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          <Input
            placeholder="Role"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          />

          <Button onClick={handleSubmit}>
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}