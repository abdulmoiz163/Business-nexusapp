"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, MessageSquare, Bell, Settings, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "./protected-route"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "investor" | "entrepreneur"
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navItems = [
    {
      title: "Dashboard",
      href: `/dashboard/${userRole}`,
      icon: LayoutDashboard,
    },
    {
      title: userRole === "investor" ? "Entrepreneurs" : "Investors",
      href: `/dashboard/${userRole}/connections`,
      icon: Users,
    },
    {
      title: "Messages",
      href: `/dashboard/${userRole}/messages`,
      icon: MessageSquare,
    },
    {
      title: "Notifications",
      href: `/dashboard/${userRole}/notifications`,
      icon: Bell,
    },
    {
      title: "Settings",
      href: `/dashboard/${userRole}/settings`,
      icon: Settings,
    },
  ]

  if (!isMounted) {
    return null
  }

  return (
    <ProtectedRoute allowedRoles={[userRole]}>
      <SidebarProvider>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 border-b bg-background">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <SidebarTrigger className="md:hidden" />
                <Link href="/" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                    <path d="M12 13v8" />
                    <path d="M5 13v6a2 2 0 0 0 2 2h8" />
                  </svg>
                  <span className="hidden text-xl font-bold md:inline-block">Business Nexus</span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                  <AvatarFallback>{user?.name?.charAt(0) || (userRole === "investor" ? "IN" : "EN")}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          <div className="flex flex-1">
            <Sidebar>
              <SidebarHeader>
                <div className="flex items-center gap-2 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                    <path d="M12 13v8" />
                    <path d="M5 13v6a2 2 0 0 0 2 2h8" />
                  </svg>
                  <span className="text-xl font-bold">Business Nexus</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={logout} tooltip="Logout">
                      <LogOut />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
