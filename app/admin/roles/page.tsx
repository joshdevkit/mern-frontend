"use client";
import { AdminLayout } from "@/components/AdminLayout";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import type { Roles } from "@/types.d";
import { useEffect, useState } from "react";
import { DataTable } from "./roles-table/data-table";
import { columns } from "./roles-table/columns";
import { fetchRoles } from "@/lib/role-api";
import HeaderBreadCrumb from "@/components/header-breadcrumb";
import RoleSkeleton from "@/components/roles/RoleSkeleton";
export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoles = async () => {
      const rolesData = await fetchRoles();
      setRoles(rolesData);
      setLoading(false);
    };

    getRoles();
  }, []);

  return (
    <SidebarProvider>
      <AdminLayout />
      <SidebarInset>
        <HeaderBreadCrumb pageTitle="Roles" subTitle="Role Data" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {loading ? (
              <RoleSkeleton />
            ) : (
              <DataTable columns={columns} data={roles} />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
