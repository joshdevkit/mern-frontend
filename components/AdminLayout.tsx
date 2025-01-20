"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Briefcase,
  ChevronRight,
  GalleryVerticalEnd,
  Home,
  Settings,
  User,
  UserCog2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import useRole from "@/lib/useRole";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Main",
      url: "#",
      icon: Home, // Lucide icon for the main group
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: Home, // Lucide icon for the sub-item
        },
      ],
    },
    {
      title: "Roles",
      url: "#",
      icon: User,
      items: [
        {
          title: "Role Page",
          url: "/admin/roles",
          icon: UserCog2,
        },
      ],
    },
    {
      title: "Services",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "Service Offered",
          url: "/admin/client-services",
          icon: Settings,
        },
      ],
    },
  ],
};

export function AdminLayout({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const navigate = useRouter();
  const role = useRole();
  React.useEffect(() => {
    if (role?.toString() !== "Admin") {
      navigate.push("/");
    }
  }, [role, navigate]);
  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/admin/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">DSM Inc.</span>
                    <span className="">v1.0.0</span>
                    <span className="text-xs text-neutral-400">
                      Developed by: JoshDeviLokano
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="gap-0">
          {data.navMain.map((item) => {
            const pathname = usePathname();
            const isOpen = item.items.some(
              (subItem) => subItem.url === pathname
            );
            return (
              <Collapsible
                key={item.title}
                title={item.title}
                defaultOpen={isOpen}
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <CollapsibleTrigger>
                      {item.title}{" "}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {item.items.map((subItem) => {
                          const isActive = pathname === subItem.url;
                          const Icon = subItem.icon; // Dynamically render the icon
                          return (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton asChild isActive={isActive}>
                                <a
                                  href={subItem.url}
                                  className={`flex items-center space-x-2 ${
                                    isActive
                                      ? "bg-sidebar-active text-sidebar-active-foreground"
                                      : ""
                                  } hover:bg-sidebar-hover hover:text-sidebar-hover-foreground`}
                                >
                                  <Icon className="size-4" />{" "}
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          })}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
