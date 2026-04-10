export const formatRupiah = (number: string) => {
  return new Intl.NumberFormat("id-ID").format(parseInt(number));
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
