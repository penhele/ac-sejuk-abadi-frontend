import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function TableCartSkeleton() {
  return (
    <div className="flex-1">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 4 }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 w-40" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex flex-row items-center space-x-4">
                  <Skeleton className="aspect-square w-24" />

                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-row gap-4">
                  <Skeleton className="aspect-square w-8" />
                  <Skeleton className="aspect-square w-8" />
                  <Skeleton className="aspect-square w-8" />
                </div>
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-40" />
              </TableCell>

              <TableCell>
                <div className="flex flex-row space-x-2">
                  <Skeleton className="aspect-square w-8" />
                  <Skeleton className="aspect-square w-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
