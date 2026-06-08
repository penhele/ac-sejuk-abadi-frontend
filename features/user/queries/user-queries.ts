import { queryOptions } from "@tanstack/react-query";
import { getUsers } from "../api/get-users";
import { userKeys } from "./user-keys";
import { getUser } from "../api/get-user";

export const getUsersQueryOptions = () =>
  queryOptions({
    queryKey: userKeys.all,
    queryFn: getUsers,
    staleTime: 1000 * 60 * 5,
  });

export const getUserByIdQueryOptions = (id: string | number) =>
  queryOptions({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
    staleTime: 1000 * 60 * 5,
  });
