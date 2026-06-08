import { useQuery } from "@tanstack/react-query";
import { getUsersQueryOptions } from "../queries/user-queries";

export default function useUsers() {
  return useQuery(getUsersQueryOptions());
}
