export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("Rp", "IDR ");
}

export function formatNumber(value: string | number): string {
  if (value === "" || value === null || value === undefined) {
    return "";
  }

  const number =
    typeof value === "string" ? Number(value.replace(/\D/g, "")) : value;

  return new Intl.NumberFormat("id-ID").format(number);
}
