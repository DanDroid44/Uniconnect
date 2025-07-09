"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, UserPlus, Database, CheckCircle, XCircle } from "lucide-react"

interface TestResult {
  step: string
  success: boolean
  message: string
  data?: any
}

export default function UserCreationDebugPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [testEmail, setTestEmail] = useState("test@ust.ac.mz")
  const [testRole, setTestRole] = useState("student")

  const runUserCreationTest = async () => {
    setIsLoading(true)
    setTestResults([])
    const results: TestResult[] = []

    try {
      const supabase = createClient()

      // Step 1: Check if profiles table exists
      results.push({
        step: "Check profiles table",
        success: true,
        message: "Checking if profiles table exists...",
      })

      try {
        const { error: tableError } = await supabase.from("profiles").select("count", { count: "exact", head: true })

        if (tableError) {
          results.push({
            step: "Check profiles table",
            success: false,
            message: `Profiles table error: ${tableError.message}`,
          })
        } else {
          results.push({
            step: "Check profiles table",
            success: true,
            message: "Profiles table exists and is accessible",
          })
        }
      } catch (error) {
        results.push({
          step: "Check profiles table",
          success: false,
          message: `Table check failed: ${error}`,
        })
      }

      // Step 2: Test user creation
      results.push({
        step: "Create test user",
        success: true,
        message: "Creating test user...",
      })

      const testPassword = "testpassword123"
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            full_name: "Test User",
            role: testRole,
          },
        },
      })

      if (authError) {
        results.push({
          step: "Create test user",
          success: false,
          message: `User creation failed: ${authError.message}`,
        })
      } else {
        results.push({
          step: "Create test user",
          success: true,
          message: "Test user created successfully",
          data: { userId: authData.user?.id },
        })

        // Step 3: Check if profile was created
        if (authData.user) {
          await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait for trigger

          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authData.user.id)
            .single()

          if (profileError || !profileData) {
            results.push({
              step: "Check profile creation",
              success: false,
              message: `Profile not found: ${profileError?.message || "No profile data"}`,
            })
          } else {
            results.push({
              step: "Check profile creation",
              success: true,
              message: "Profile created successfully",
              data: profileData,
            })
          }

          // Step 4: Clean up test user
          const { error: deleteError } = await supabase.auth.admin.deleteUser(authData.user.id)

          if (deleteError) {
            results.push({
              step: "Cleanup test user",
              success: false,
              message: `Cleanup failed: ${deleteError.message}`,
            })
          } else {
            results.push({
              step: "Cleanup test user",
              success: true,
              message: "Test user cleaned up successfully",
            })
          }
        }
      }
    } catch (error) {
      results.push({
        step: "General error",
        success: false,
        message: `Unexpected error: ${error}`,
      })
    }

    setTestResults(results)
    setIsLoading(false)
  }

  const StatusIcon = ({ success }: { success: boolean }) =>
    success ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Creation Debug Tool</h1>
          <p className="text-gray-600">Test the user registration and profile creation process</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Test Configuration
              </CardTitle>
              <CardDescription>Configure the test user parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="testEmail" className="text-sm font-medium">
                  Test Email
                </label>
                <Input
                  id="testEmail"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@ust.ac.mz"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="testRole" className="text-sm font-medium">
                  Test Role
                </label>
                <Select value={testRole} onValueChange={setTestRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="lecturer">Lecturer</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={runUserCreationTest} disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Test...
                  </>
                ) : (
                  <>
                    <Database className="mr-2 h-4 w-4" />
                    Run User Creation Test
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Test Results
              </CardTitle>
              <CardDescription>Results of the user creation test</CardDescription>
            </CardHeader>
            <CardContent>
              {testResults.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No test results yet. Run a test to see results.</p>
              ) : (
                <div className="space-y-4">
                  {testResults.map((result, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{result.step}</span>
                        <StatusIcon success={result.success} />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                      {result.data && (
                        <div className="bg-gray-50 p-2 rounded text-xs">
                          <pre>{JSON.stringify(result.data, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Troubleshooting Guide</CardTitle>
            <CardDescription>Common issues and solutions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">If profiles table doesn't exist:</h4>
              <p className="text-sm">Run the database setup scripts in your Supabase SQL editor.</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">If user creation fails:</h4>
              <p className="text-sm">
                Check your Supabase authentication settings and ensure email confirmations are configured correctly.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">If profile creation fails:</h4>
              <p className="text-sm">
                Check if the trigger function exists and is working. Run the fix-user-registration.sql script.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
