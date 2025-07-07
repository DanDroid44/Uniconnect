import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      `Missing Supabase environment variables. Please check your .env.local file. URL: ${!!supabaseUrl}, Key: ${!!supabaseAnonKey}`,
    )
  }

  // Validate URL format
  try {
    new URL(supabaseUrl)
  } catch (urlError) {
    throw new Error(`Invalid Supabase URL format: ${supabaseUrl}`)
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
