"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function UserCreationDebugPage() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password123")
  const [fullName, setFullName] = useState("Test User")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const supabase = createClient()

  const testUserCreation = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      console.log("Testing user creation...")

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: "student",
            faculty: "computer-science",
          },
        },
      })

      console.log("User creation result:", { data, error })

      if (error) {
        setResult({ success: false, error: error.message, details: error })
      } else {
        // Check if profile was created
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user?.id)
          .single()

        setResult({
          success: true,
          user: data.user,
          profile,
          profileError: profileError?.message,
        })
      }
    } catch (error: any) {
      console.error("Unexpected error:", error)
      setResult({ success: false, error: error.message, details: error })
    } finally {
      setIsLoading(false)
    }
  }

  const checkDatabaseStructure = async () => {
    setIsLoading(true)
    try {
      // Check if we can query the profiles table
      const { data, error } = await supabase.from("profiles").select("*").limit(1)

      setResult({
        success: !error,
        message: error ? `Database error: ${error.message}` : "Database connection successful",
        data,
        error: error?.message,
      })
    } catch (error: any) {
      setResult({ success: false, error: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>User Creation Debug Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={testUserCreation} disabled={isLoading}>
              {isLoading ? "Testing..." : "Test User Creation"}
            </Button>
            <Button onClick={checkDatabaseStructure} disabled={isLoading} variant="outline">
              Check Database
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
