"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Roles } from "@/types.d";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Check, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const columns: ColumnDef<Roles>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: true,
  //   enableHiding: true,
  // },
  {
    accessorKey: "role",
    header: "Role",

    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Role
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const roles = row.original;
      const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 p-2 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-transparent dark:border-transparent z-50"
            >
              <DropdownMenuLabel className="text-left text-md font-semibold text-gray-700 dark:text-gray-200 px-3 mb-3">
                Actions
              </DropdownMenuLabel>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setSelectedRoleId(roles._id.toString())}
                    className="w-full text-left text-sm text-gray-600 dark:text-gray-300 
                    hover:bg-gray-100 dark:hover:bg-gray-700 
                    px-3 py-1 rounded-md transition-all duration-150 focus:ring-0 focus:outline-none cursor-pointer"
                    variant="outline"
                  >
                    Edit Role
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Role</DialogTitle>
                    <DialogDescription className="text-justify text-xs">
                      Changing role details may also change the roles of every
                      user and may cause unhandled issue, if you wish to hit{" "}
                      <span className="bg-gray-200 rounded-lg px-3">
                        {" "}
                        Save changes.
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roleId" className="text-right">
                        Role Key
                      </Label>
                      <Input
                        id="roleId"
                        value={selectedRoleId || ""}
                        readOnly
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="roleName" className="text-right">
                        Role
                      </Label>
                      <Input
                        id="roleName"
                        defaultValue={roles.role.toString()}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <span>
                        <Check className="w-6 h-6" />
                      </span>{" "}
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <DropdownMenuSeparator className="my-1 border-gray-200 dark:border-gray-700" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setSelectedRoleId(roles._id.toString())}
                    className="w-full text-left text-sm text-gray-600 dark:text-gray-300 
                    hover:bg-gray-100 dark:hover:bg-gray-700 
                    px-3 py-1 rounded-md transition-all duration-150 focus:ring-0 focus:outline-none cursor-pointer"
                    variant="outline"
                  >
                    Remove Role
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Remove Role</DialogTitle>
                    <DialogDescription>
                      Removing role will also delete the related user registed
                      to the app. Please proceed with caution.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit">Yes, Proceed</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
