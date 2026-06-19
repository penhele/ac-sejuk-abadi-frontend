import { Badge } from "../ui/badge";

export default function PkBadge({ pk }: { pk: string | undefined }) {
  return (
    <Badge variant={pk ? "secondary" : "outline"}>
      {pk ? `${pk} PK` : "Not Spesified"}
    </Badge>
  );
}
