import { useQuery } from "@tanstack/react-query";
import { getUsersQueryOptions } from "../queries/use-queries";

export default function useUsers() {
  return useQuery(getUsersQueryOptions());
}
