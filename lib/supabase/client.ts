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

  const client = createBrowserClient(supabaseUrl, supabaseAnonKey)

  // Add error handling for network issues
  const originalAuth = client.auth
  client.auth = new Proxy(originalAuth, {
    get(target, prop) {
      const value = target[prop]
      if (typeof value === "function") {
        return async (...args: any[]) => {
          try {
            return await value.apply(target, args)
          } catch (error) {
            console.warn("Supabase auth error (likely network issue):", error)
            // Return a mock response for development
            if (prop === "getUser") {
              return { data: { user: null }, error: null }
            }
            if (prop === "getSession") {
              return { data: { session: null }, error: null }
            }
            throw error
          }
        }
      }
      return value
    },
  })

  return client
}
