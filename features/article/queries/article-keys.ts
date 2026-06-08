export const articleKeys = {
  all: ["articles"] as const,
  detail: (id: string | number) => [...articleKeys.all, id] as const,
};
