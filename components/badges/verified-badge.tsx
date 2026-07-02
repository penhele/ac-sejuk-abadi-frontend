import { Badge } from "../ui/badge";

interface Props {
  isVerified: boolean;
}

export default function VerifiedBadge({ isVerified }: Props) {
  return (
    <Badge variant={isVerified ? "default" : "destructive"}>
      {isVerified ? "Sudah" : "Belum"}
    </Badge>
  );
}
