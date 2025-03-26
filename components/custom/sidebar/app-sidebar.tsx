"use client";

import * as React from "react";
import { LayoutDashboardIcon } from "lucide-react";

import { NavMain } from "@/components/custom/sidebar/nav-main";
import { NavUser, NavUserSkeleton } from "@/components/custom/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Session } from "@/lib/auth/types";
import { useSession } from "@/lib/auth/client";
import { NavHeader } from "./nav-header";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  initialSession: Session | null;
}

export function AppSidebar({ initialSession, ...props }: AppSidebarProps) {
  const { data: session } = useSession();

  const activeSession = session || initialSession;

  const navItems = [
    {
      title: "Tableau de bord",
      url: "",
      icon: LayoutDashboardIcon,
      items: [
        { title: "Accueil", url: "/admin" },
        { title: "Utilisateurs", url: "/admin/users" },
        { title: "Équipes", url: "/admin/teams" },
      ],
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        {activeSession ? <NavUser session={session} /> : <NavUserSkeleton />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
