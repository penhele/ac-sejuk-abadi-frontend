import { Badge } from "../ui/badge";

export default function PkBadge({ pk }: { pk: string }) {
  return <Badge variant={"secondary"}>{pk} PK</Badge>;
}
