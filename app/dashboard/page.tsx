import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Handle auth session missing error (user not logged in)
  if (error && error.message === "Auth session missing!") {
    redirect("/auth/login")
  }

  // Handle other auth errors
  if (error) {
    console.error("Dashboard auth error:", error)
    redirect("/auth/login")
  }

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  return <DashboardContent user={user} />
}
