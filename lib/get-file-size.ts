export function getFileSizeMB(bytes: number, fractionDigits = 2): number {
  return Number((bytes / (1024 * 1024)).toFixed(fractionDigits));
}
