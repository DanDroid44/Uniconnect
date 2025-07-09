"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { LecturerSidebar } from "@/components/dashboard/lecturer-sidebar"
import { CoordinatorSidebar } from "@/components/dashboard/coordinator-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NotificationSystem } from "@/components/dashboard/notification-system"
import { Loader2 } from "lucide-react"

interface Profile {
  role: string
  full_name: string
  email: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("role, full_name, email")
            .eq("id", user.id)
            .single()

          if (profileData) {
            setProfile(profileData)
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const getSidebarComponent = (role: string) => {
    switch (role) {
      case "lecturer":
        return LecturerSidebar
      case "coordinator":
        return CoordinatorSidebar
      default:
        return AppSidebar
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const SidebarComponent = profile ? getSidebarComponent(profile.role) : AppSidebar

  return (
    <SidebarProvider>
      <SidebarComponent />
      <SidebarInset>
        <DashboardHeader profile={profile} />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <NotificationSystem />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
