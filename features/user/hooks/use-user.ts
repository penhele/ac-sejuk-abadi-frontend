import { useQuery } from "@tanstack/react-query";
import { getUserByIdQueryOptions } from "../queries/user-queries";

export default function useUser(id: string | number) {
  return useQuery(getUserByIdQueryOptions(id));
}
