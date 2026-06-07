import { 
    LayoutDashboard, 
    CloudLightning, 
    LucideStars 
} from "lucide-react";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { 
    Logo,
    Account
} from "./sidebarProps"

const modules = [
  { name: "Dashboard", url: "/", icon: LayoutDashboard },
  { name: "Sprint Workspace", url: "/sprints", icon: CloudLightning },
  { name: "AI Copilot", url: "/copilot", icon: LucideStars },
];

export default function SidebarLayout() {

  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup />
            <SidebarMenu>
                {modules.map((module) => (
                    <SidebarMenuItem key={module.name}>
                    <SidebarMenuButton asChild>
                        <Link href={module.url}>
                            <module.icon />
                            <span>{module.name}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <Account user={{ name: "John Doe", email: "j.doe@example.com", avatar: "https://github.com/shadcn.png" }} />
      </SidebarFooter>

    </Sidebar>
  )
}