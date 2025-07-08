"use client"

import { Home, BookOpen, Users, Upload, GraduationCap, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Courses", url: "/dashboard/my-courses", icon: BookOpen },
  { title: "Course Enrollment", url: "/dashboard/enrollment", icon: Users },
  { title: "Upload Marks", url: "/dashboard/marks", icon: Upload },
  { title: "Grade Reports", url: "/dashboard/reports", icon: GraduationCap },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function LecturerSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600 group-data-[collapsible=icon]:hidden">UniConnect</span>
            <span className="text-xl font-bold text-blue-600 group-data-[collapsible=icon]:block hidden">UC</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                <Link href={item.url} className="flex items-center space-x-3 px-3 py-2">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-gray-900 truncate">Prof. Maria Santos</p>
            <p className="text-xs text-gray-500 truncate">Lecturer</p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
