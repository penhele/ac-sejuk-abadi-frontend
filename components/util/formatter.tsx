export const formatRupiah = (number: string) => {
  return new Intl.NumberFormat("id-ID").format(parseInt(number));
};
