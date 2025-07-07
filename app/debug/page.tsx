export default function DebugPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6">Environment Debug</h1>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Supabase URL:</h3>
            <p className="text-sm bg-gray-100 p-2 rounded">
              {supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "❌ Not set"}
            </p>
          </div>

          <div>
            <h3 className="font-medium">Supabase Anon Key:</h3>
            <p className="text-sm bg-gray-100 p-2 rounded">
              {supabaseAnonKey ? `${supabaseAnonKey.substring(0, 30)}...` : "❌ Not set"}
            </p>
          </div>

          <div>
            <h3 className="font-medium">Environment Variables Status:</h3>
            <ul className="text-sm space-y-1">
              <li>URL Present: {supabaseUrl ? "✅" : "❌"}</li>
              <li>Key Present: {supabaseAnonKey ? "✅" : "❌"}</li>
              <li>URL Length: {supabaseUrl?.length || 0}</li>
              <li>Key Length: {supabaseAnonKey?.length || 0}</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded">
            <h4 className="font-medium text-blue-900">Expected Values:</h4>
            <p className="text-sm text-blue-800 mt-1">
              URL should start with: https://atqjfgtvpaektrpziesr.supabase.co
            </p>
            <p className="text-sm text-blue-800">Key should start with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
