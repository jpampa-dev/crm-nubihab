"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, Home, LayoutDashboard, LogOut, MessageSquare, Settings, Users } from "lucide-react"
import { ChatWidget } from "@/components/dashboard/chat-widget"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="border-b">
            <div className="flex items-center gap-2 px-2 py-3">
              <Building className="h-6 w-6" />
              <span className="font-bold text-xl">Nubihab</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/leads"}>
                  <Link href="/dashboard/leads">
                    <MessageSquare className="h-5 w-5" />
                    <span>Lead Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/apartments"}>
                  <Link href="/dashboard/apartments">
                    <Home className="h-5 w-5" />
                    <span>Apartment Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/users"}>
                  <Link href="/dashboard/users">
                    <Users className="h-5 w-5" />
                    <span>User Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                  <Link href="/dashboard/#">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" alt="Admin User" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@nubihab.com</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Nubihab Dashboard</h1>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                View Website
              </Button>
            </Link>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
        <ChatWidget />
      </div>
    </SidebarProvider>
  )
}
