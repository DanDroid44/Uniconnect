"use client"

import type * as React from "react"
import { GraduationCap, Home, Users, BookOpen, BarChart3, Calendar, Settings, User, UserCheck } from "lucide-react"

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
} from "@/components/ui/sidebar"

// Navigation items for coordinators
const coordinatorNavigation = [
  {
    title: "Dashboard",
    url: "/dashboard/coordinator",
    icon: Home,
  },
  {
    title: "Estudantes",
    url: "/dashboard/students",
    icon: Users,
  },
  {
    title: "Cursos",
    url: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Matrículas",
    url: "/dashboard/course-enrollment",
    icon: UserCheck,
  },
  {
    title: "Relatórios",
    url: "/dashboard/grade-reports",
    icon: BarChart3,
  },
]

const managementItems = [
  {
    title: "Horários",
    url: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    title: "Grupos",
    url: "/dashboard/student-groups",
    icon: Users,
  },
]

const accountItems = [
  {
    title: "Perfil",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Configurações",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function CoordinatorSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-purple-600">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">UniConnect</span>
            <span className="text-xs text-muted-foreground">Coordenador</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Coordenação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {coordinatorNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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

        <SidebarGroup>
          <SidebarGroupLabel>Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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

        <SidebarGroup>
          <SidebarGroupLabel>Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
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
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
