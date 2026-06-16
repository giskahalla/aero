import { 
    LayoutDashboard, 
    Zap, 
    LucideStars,
    UsersRound,
    CirclePlus 
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
} from "@/components/ui/sidebar"
import { Teams } from '@/features'

import { 
    Logo,
    Account
} from "./sidebarProps"

const modules = [
  { name: "Dashboard", url: "/", icon: LayoutDashboard },
  { name: "Tasks Overview", url: "tasks", icon: Zap },
  { name: "AI Copilot", url: "/copilot", icon: LucideStars },
];

export default function SidebarLayout() {

  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                {modules.map((module) => (
                    <SidebarMenuItem key={module.name}>
                      <SidebarMenuButton asChild  className="h-12">
                          <Link href={module.url}>
                              <module.icon />
                              <span>{module.name}</span>
                          </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="h-12">
                      <UsersRound />
                      <span>Teams</span>
                      <Teams
                          btnAction={     
                            <CirclePlus className="ml-auto"/>
                          }
                      />
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Account user={{ name: "John Doe", email: "j.doe@example.com", avatar: "https://github.com/shadcn.png" }} />
      </SidebarFooter>

    </Sidebar>
  )
}