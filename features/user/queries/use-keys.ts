export const userKeys = {
  all: ["users"] as const,
  detail: (id: string | number) => ["users", id] as const,
};
