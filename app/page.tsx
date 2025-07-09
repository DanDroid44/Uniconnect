"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { SetupGuide } from "@/components/setup-guide"
import { LandingPage } from "@/components/landing-page"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasEnvVars, setHasEnvVars] = useState(false)
  const [networkError, setNetworkError] = useState(false)
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

    // Check authentication status with timeout and error handling
    const checkAuth = async () => {
      try {
        const supabase = createClient()

        // Add timeout to prevent hanging
        const authPromise = supabase.auth.getUser()
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Auth check timeout")), 5000),
        )

        const result = await Promise.race([authPromise, timeoutPromise])
        const {
          data: { user },
          error,
        } = result as any

        if (user) {
          router.push("/dashboard")
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.warn("Auth check failed (likely network issue):", error)
        setNetworkError(true)
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

  if (networkError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">Network Connection Issue</h2>
            <p className="text-yellow-700 text-sm mb-4">
              Unable to connect to Supabase. This might be due to network restrictions in the preview environment.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
          <div className="text-left">
            <h3 className="font-semibold mb-2">For Development:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Verify Supabase URL and keys in .env.local</li>
              <li>• Try running locally with `npm run dev`</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return <LandingPage />
}
