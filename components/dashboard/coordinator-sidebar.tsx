"use client"

import { Users, UserPlus, UserMinus, CreditCard, Megaphone, FileText, BarChart3, Settings } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Student Management",
    items: [
      {
        title: "All Students",
        url: "/dashboard/students",
        icon: Users,
      },
      {
        title: "Add Student",
        url: "/dashboard/students/add",
        icon: UserPlus,
      },
      {
        title: "Remove Student",
        url: "/dashboard/students/remove",
        icon: UserMinus,
      },
    ],
  },
  {
    title: "Financial Management",
    items: [
      {
        title: "Payment Status",
        url: "/dashboard/payments",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        title: "Announcements",
        url: "/dashboard/announcements",
        icon: Megaphone,
      },
      {
        title: "Set Tests",
        url: "/dashboard/tests",
        icon: FileText,
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
      },
    ],
  },
]

export function CoordinatorSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <span className="text-sm font-bold">UC</span>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">UniConnect</span>
            <span className="truncate text-xs text-gray-500">Coordinator</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <a href="/dashboard/settings">
                <Settings />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
