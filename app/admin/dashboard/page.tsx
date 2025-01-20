import { AdminLayout } from "@/components/AdminLayout";
import HeaderBreadCrumb from "@/components/header-breadcrumb";
import Title from "@/components/Title";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <>
      <Title description="Admin - Configure roles, services, clients and appointments">
        Admin - Dashboard
      </Title>
      <SidebarProvider>
        <AdminLayout />
        <SidebarInset>
          <HeaderBreadCrumb pageTitle="Dashboard" subTitle="Admin Overview" />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <p>Dashboard</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
