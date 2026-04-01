"use client";

import { useState } from "react";
import { toast } from "sonner";

export function useProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });

  const [formData, setFormData] = useState({
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "08123456789",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setIsDirty(true);
  };

  const togglePass = (key: keyof typeof showPass) => {
    setShowPass((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok!");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsDirty(false);
    toast.success("Profil berhasil diperbarui!");
  };

  return {
    formData,
    isLoading,
    isDirty,
    showPass,
    handleInputChange,
    handleSubmit,
    togglePass,
  };
}