export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
