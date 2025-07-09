"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface UserProfile {
  role: string
  faculty?: string
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          router.push("/auth/login")
          return
        }

        // Get user profile to determine role
        const { data: profile, error: profileError } = await supabase
          .from("user_profiles")
          .select("role, faculty")
          .eq("user_id", user.id)
          .single()

        if (profileError || !profile) {
          // Default to student if no profile found
          router.push("/dashboard/student")
          return
        }

        // Route based on role
        switch (profile.role) {
          case "coordinator":
            router.push("/dashboard/coordinator")
            break
          case "lecturer":
            router.push("/dashboard/lecturer")
            break
          case "student":
          default:
            router.push("/dashboard/student")
            break
        }
      } catch (error) {
        console.error("Error getting user role:", error)
        router.push("/dashboard/student")
      } finally {
        setLoading(false)
      }
    }

    getUserRole()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Carregando seu painel...</p>
        </div>
      </div>
    )
  }

  return null
}
