export const acTypeKeys = {
  all: ["acTypes"] as const,
  detail: (id: string | number) => ["acTypes", id] as const,
};
