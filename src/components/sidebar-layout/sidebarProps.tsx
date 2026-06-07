"use client";

import {
    SidebarMenuButton,
    SidebarTrigger
} from "@/components/ui/sidebar"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { 
    useSidebar 
} from "@/components/ui/sidebar"


export function Logo() {

  const { open, toggleSidebar } = useSidebar()

  return (
    <div className={`flex justify-between items-center gap-2 transition-all duration-300 border-b ${open ? "w-auto" : "w-full"}`}>

        <div className={`flex h-[58px] shrink-0 items-center border-sidebar-border transition-all duration-300 justify-start gap-3`}>
            {/* logo */}
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-foreground" onClick={toggleSidebar}>
                <span className="font-sans text-[11px] font-black tracking-tight text-background">
                A
                </span>
            </div>

            {/* Teks Aero */}
            <div className={`overflow-hidden transition-all duration-300 ${open ? "w-auto opacity-100" : "w-0 opacity-0"}`}>
                <h1 className="text-sm font-bold tracking-wide whitespace-nowrap">
                Aero
                </h1>
            </div>
        </div>

        {open && (
            <SidebarTrigger />
        )}
    </div>
  );
}

export function Account({ user }: { user: { name: string, email: string, avatar: string} }) {
    return (
        <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
            <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
        </SidebarMenuButton>
    )
}
