"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, ExternalLink, Database, Key, Globe } from "lucide-react"

export function SetupGuide() {
  const [copiedEnv, setCopiedEnv] = useState(false)

  const copyEnvTemplate = () => {
    const envTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database Configuration (automatically provided by Supabase)
POSTGRES_URL=your_postgres_connection_string
POSTGRES_PRISMA_URL=your_postgres_prisma_url
POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_url
POSTGRES_USER=your_postgres_user
POSTGRES_HOST=your_postgres_host
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database`

    navigator.clipboard.writeText(envTemplate)
    setCopiedEnv(true)
    setTimeout(() => setCopiedEnv(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UniConnect Setup
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Configure your environment to get started with the university management platform
          </p>
        </div>

        {/* Setup Steps */}
        <div className="space-y-6">
          {/* Step 1: Supabase Project */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Create Supabase Project
                  </CardTitle>
                  <CardDescription>Set up your database and authentication</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Quick Setup:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>
                    Go to{" "}
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                    >
                      supabase.com <ExternalLink className="w-3 h-3" />
                    </a>{" "}
                    and create a new project
                  </li>
                  <li>Choose a project name (e.g., "uniconnect-ust")</li>
                  <li>Set a strong database password</li>
                  <li>Select a region close to Mozambique (e.g., South Africa)</li>
                  <li>Wait for the project to be created (2-3 minutes)</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Environment Variables */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Configure Environment Variables
                  </CardTitle>
                  <CardDescription>Copy your Supabase credentials to .env.local</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Environment Template</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyEnvTemplate}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    {copiedEnv ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedEnv ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create a <code className="bg-gray-200 px-1 rounded">.env.local</code> file in your project root and
                  add:
                </p>
                <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
                  {`# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key`}
                </pre>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Where to find your credentials:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Go to your Supabase project dashboard</li>
                  <li>Click on "Settings" → "API"</li>
                  <li>Copy the "Project URL" and "anon public" key</li>
                  <li>Copy the "service_role secret" key (keep this secure!)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Database Setup */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Setup Database Schema
                  </CardTitle>
                  <CardDescription>Run the SQL scripts to create tables and policies</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Database Setup Steps:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Go to your Supabase project dashboard</li>
                  <li>Click on "SQL Editor" in the sidebar</li>
                  <li>Run the following scripts in order:</li>
                </ol>
                <div className="mt-3 space-y-2">
                  <Badge variant="outline" className="mr-2">
                    1. database-setup.sql
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    2. setup-rls-policies.sql
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    3. create-functions.sql
                  </Badge>
                  <Badge variant="outline">4. seed-data.sql</Badge>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Quick Setup Option:</h4>
                <p className="text-sm text-gray-600 mb-2">For testing, you can use the simplified setup:</p>
                <Badge variant="secondary">database-setup-simple.sql</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Authentication */}
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <div>
                  <CardTitle>Configure Authentication</CardTitle>
                  <CardDescription>Enable email authentication and configure providers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Authentication Settings:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Go to "Authentication" → "Settings" in your Supabase dashboard</li>
                  <li>Enable "Enable email confirmations" (optional for development)</li>
                  <li>Set "Site URL" to your application URL (e.g., http://localhost:3000)</li>
                  <li>Add redirect URLs for production deployment</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Success Message */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">Ready to Launch!</h3>
                <p className="text-green-700 mb-4">
                  Once you've completed all steps, restart your development server and you'll be redirected to the
                  landing page.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Documentation
                  </Button>
                  <Button variant="outline">
                    <Database className="w-4 h-4 mr-2" />
                    Test Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>
            Need help? Check the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              documentation
            </a>{" "}
            or{" "}
            <a href="#" className="text-blue-600 hover:underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
