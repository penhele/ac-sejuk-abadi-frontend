import { Badge } from "../ui/badge";

interface Props {
  isVerified: boolean;
}

export default function VerifiedBadge({ isVerified }: Props) {
  return (
    <Badge
      variant={isVerified ? "default" : "destructive"}
      className={
        isVerified
          ? "bg-green-100 text-green-600 dark:bg-green-100/30 dark:text-green-400"
          : ""
      }
    >
      {isVerified ? "Sudah" : "Belum"}
    </Badge>
  );
}
