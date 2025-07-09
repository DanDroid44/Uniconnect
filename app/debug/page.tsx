"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Users, Key, RefreshCw } from "lucide-react"

interface DebugInfo {
  supabaseConnection: boolean
  authStatus: boolean
  databaseTables: string[]
  userCount: number
  error?: string
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const runDiagnostics = async () => {
    setLoading(true)
    const supabase = createClient()
    const info: DebugInfo = {
      supabaseConnection: false,
      authStatus: false,
      databaseTables: [],
      userCount: 0,
    }

    try {
      // Test Supabase connection
      const { data: connectionTest, error: connectionError } = await supabase
        .from("profiles")
        .select("count", { count: "exact", head: true })

      if (!connectionError) {
        info.supabaseConnection = true
      }

      // Test auth status
      const { data: authData } = await supabase.auth.getUser()
      info.authStatus = !!authData.user

      // Get table information
      const { data: tables } = await supabase.rpc("get_table_names").select()
      if (tables) {
        info.databaseTables = tables.map((t: any) => t.table_name)
      }

      // Get user count
      const { count } = await supabase.from("profiles").select("*", { count: "exact", head: true })
      info.userCount = count || 0
    } catch (error) {
      info.error = error instanceof Error ? error.message : "Unknown error"
    }

    setDebugInfo(info)
    setLoading(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const StatusIcon = ({ status }: { status: boolean }) =>
    status ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Diagnostics</h1>
          <p className="text-gray-600">Check the status of your UniConnect platform</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Database Connection
              </CardTitle>
              <CardDescription>Supabase connection and authentication status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Testing connection...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Supabase Connection</span>
                    <StatusIcon status={debugInfo?.supabaseConnection || false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Authentication</span>
                    <StatusIcon status={debugInfo?.authStatus || false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Count</span>
                    <Badge variant="outline">{debugInfo?.userCount || 0}</Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Database Tables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Database Schema
              </CardTitle>
              <CardDescription>Available database tables</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Checking schema...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {debugInfo?.databaseTables.length ? (
                    debugInfo.databaseTables.map((table) => (
                      <Badge key={table} variant="secondary" className="mr-2 mb-2">
                        {table}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500">No tables found. Run the database setup scripts.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Environment Configuration
              </CardTitle>
              <CardDescription>Check if required environment variables are set</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>NEXT_PUBLIC_SUPABASE_URL</span>
                <StatusIcon status={!!process.env.NEXT_PUBLIC_SUPABASE_URL} />
              </div>
              <div className="flex items-center justify-between">
                <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <StatusIcon status={!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY} />
              </div>
              <div className="flex items-center justify-between">
                <span>POSTGRES_URL</span>
                <StatusIcon status={!!process.env.POSTGRES_URL} />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common debugging and setup tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={runDiagnostics} className="w-full" disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh Diagnostics
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="/debug/user-creation">Test User Creation</a>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="/auth/register">Create Test Account</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Error Display */}
        {debugInfo?.error && (
          <Card className="mt-6 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Error Details</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-red-700 text-sm overflow-x-auto">{debugInfo.error}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
