import VerifiedBadge from "@/components/badges/verified-badge";
import DeleteButton from "@/components/buttons/delete-button";
import SheetButton from "@/components/buttons/sheet-button";
import { RoleSelect } from "@/components/fields/role-select";
import { deleteUser } from "@/features/user/api/delete-user";
import { userKeys } from "@/features/user/queries/user-keys";
import { User } from "@/features/user/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Mail, MapPin, Pencil } from "lucide-react";
import EditUserForm from "./edit-user-form";

export const userColumns: ColumnDef<User>[] = [
  {
    header: "ID User",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex flex-row items-center space-x-between-items-sm">
          <div className="rounded-full p-2 bg-sky-200 text-sky-600 font-bold aspect-square h-10 flex items-center justify-center">
            {user.first_name[0].toUpperCase()}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {user.first_name} {user.last_name}
            </span>
            <span className="text-xs text-muted-foreground text-ellipsis">
              ID: {user.id}
            </span>
          </div>
        </div>
    );
    },
  },
  {
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-between-items-xs ">
        <div className="rounded-full bg-muted p-2">
          <Mail className="size-4 text-muted-foreground" />
        </div>

        <span>{row.original.email}</span>
      </div>
    ),
  },
  {
    header: "Address",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="">
          {user.address ? (
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-muted p-2">
                <MapPin className="size-4 text-muted-foreground" />
              </div>

              <div className="">
                <p className="text-sm font-medium">{user.address}</p>

                <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                  <span>
                    RT {user.rt} / RW {user.rw}
                  </span>
                  <span>•</span>
                  <span>Kode Pos {user.zip_code}</span>
                </div>
              </div>
            </div>
          ) : (
            <span>Alamat tidak tersedia</span>
          )}
        </div>
      );
    },
  },
  {
    header: "Verifikasi",
    cell: ({ row }) => {
      return <VerifiedBadge isVerified={row.original.is_verified} />;
    },
  },
  {
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;

      return <RoleSelect role={role} userId={row.original.id} />;
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="space-x-1">
          <SheetButton title="Update User" Icon={Pencil}>
            <EditUserForm user={user} />
          </SheetButton>

          <DeleteButton
            id={user.id}
            mutationFn={deleteUser}
            queryKey={userKeys.all}
            item={`${user.first_name} ${user.last_name}`}
          />
        </div>
      );
    },
  },
];
