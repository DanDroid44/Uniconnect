"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { CoordinatorSidebar } from "@/components/dashboard/coordinator-sidebar"
import { LecturerSidebar } from "@/components/dashboard/lecturer-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/client"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserRole = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

        setUserRole(profile?.role || user.user_metadata?.role || "student")
      }
      setLoading(false)
    }

    getUserRole()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const getSidebarComponent = () => {
    switch (userRole) {
      case "coordinator":
        return <CoordinatorSidebar />
      case "lecturer":
        return <LecturerSidebar />
      default:
        return <AppSidebar />
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      {getSidebarComponent()}
      <SidebarInset>
        <DashboardHeader />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
