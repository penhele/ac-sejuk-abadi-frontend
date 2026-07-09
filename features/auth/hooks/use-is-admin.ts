"use client";

import { useMe } from "./use-me";

/**
 * Hook untuk mengecek apakah user yang login adalah admin
 * @returns boolean true jika user adalah admin, false jika tidak atau belum login
 */
export const useIsAdmin = () => {
  const { data: user, isLoading, isError } = useMe();

  return {
    isAdmin: user?.role === "admin",
    isLoading,
    isError,
    user,
  };
};
