export const productKeys = {
  all: ["products"] as const,

  lists: () => [...productKeys.all, "list"] as const,

  list: (params?: unknown) => [...productKeys.lists(), params] as const,

  details: () => [...productKeys.all, "detail"] as const,

  detail: (id: string | number) => [...productKeys.details(), id] as const,

  infinite: (params?: unknown) =>
    [...productKeys.all, "infinite", params] as const,
};
