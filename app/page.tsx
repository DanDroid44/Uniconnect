"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { SetupGuide } from "@/components/setup-guide"
import { LandingPage } from "@/components/landing-page"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasEnvVars, setHasEnvVars] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      setHasEnvVars(false)
      setIsLoading(false)
      return
    }

    setHasEnvVars(true)

    // Check authentication status
    const checkAuth = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (user) {
          router.push("/dashboard")
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (!hasEnvVars) {
    return <SetupGuide />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <LandingPage />
}
