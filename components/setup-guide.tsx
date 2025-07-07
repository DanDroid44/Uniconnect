import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Database, Key, Globe } from "lucide-react"

export function SetupGuide() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-blue-600">UniConnect</span>
            <Badge variant="outline">Setup Required</Badge>
          </div>
          <CardTitle className="text-xl">Supabase Configuration Required</CardTitle>
          <CardDescription>Please complete the following steps to set up your UniConnect platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Globe className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium">1. Create a Supabase Project</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Go to{" "}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    Supabase Dashboard
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>{" "}
                  and create a new project
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Key className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium">2. Get Your API Keys</h3>
                <p className="text-sm text-gray-600 mt-1">
                  In your Supabase project, go to Settings → API to find your:
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Project URL</li>
                  <li>• Anon/Public Key</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Database className="h-5 w-5 text-purple-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium">3. Configure Environment Variables</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file in your project root:
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded mt-2 text-xs font-mono">
                  <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co</div>
                  <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here</div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <Database className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium">4. Set Up Database</h3>
                <p className="text-sm text-gray-600 mt-1">Run the provided SQL scripts in your Supabase SQL Editor:</p>
                <ol className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>1. database-setup-simple.sql</li>
                  <li>2. setup-rls-policies.sql</li>
                  <li>3. create-functions.sql</li>
                  <li>4. seed-data.sql</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
            <p className="text-sm text-blue-800">
              Follow the{" "}
              <a
                href="https://supabase.com/docs/guides/getting-started/quickstarts/nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline inline-flex items-center"
              >
                Supabase Next.js Quick Start Guide
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>{" "}
              for detailed setup instructions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
