import DeleteButton from "@/components/buttons/delete-button";
import { RoleSelect } from "@/components/fields/role-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EditButton from "@/features/brand/compenents/edit-button";
import { deleteUser } from "@/features/user/api/delete-user";
import { userKeys } from "@/features/user/queries/user-keys";
import { User } from "@/features/user/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Mail, MapPin } from "lucide-react";

export const userColumns: ColumnDef<User>[] = [
  {
    header: "ID Brand",
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
        <Mail size={16} /> {row.original.email}
      </div>
    ),
  },
  {
    header: "Address",
    cell: ({ row }) => {
      const address = row.original.address;

      return (
        <div className="">
          {address ? (
            <div className="flex items-center gap-between-items-xs">
              <MapPin size={16} /> {row.original.address}
            </div>
          ) : (
            <span>Alamat tidak tersedia</span>
          )}
        </div>
      );
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
          <EditButton title="Update User">
            {/* <EditUserForm id={user.id} /> */}
            <div className=""></div>
          </EditButton>

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
