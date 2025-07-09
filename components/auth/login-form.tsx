"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PasswordInput } from "@/components/ui/password-input"
import { validateEmail, validatePassword } from "@/lib/validation"
import { useLanguage } from "@/hooks/use-language"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [networkError, setNetworkError] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setNetworkError(false)
    setIsLoading(true)

    // Validate inputs
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    if (!emailValidation.isValid) {
      setError(emailValidation.error || "Invalid email")
      setIsLoading(false)
      return
    }

    if (!passwordValidation.isValid) {
      setError(passwordValidation.error || "Invalid password")
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      // Add timeout for login attempt
      const loginPromise = supabase.auth.signInWithPassword({
        email,
        password,
      })

      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Login timeout")), 10000))

      const { data, error: authError } = (await Promise.race([loginPromise, timeoutPromise])) as any

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          setError(t("auth.invalidCredentials"))
        } else {
          setError(authError.message)
        }
        return
      }

      if (data.user) {
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Login error:", error)
      if (error.message === "Login timeout" || error.message.includes("fetch")) {
        setNetworkError(true)
        setError("Network connection issue. Please check your connection and try again.")
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t("auth.signIn")}</CardTitle>
        <CardDescription className="text-center">{t("auth.signInDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        {networkError && (
          <Alert className="mb-4 border-yellow-200 bg-yellow-50">
            <AlertDescription className="text-yellow-800">
              Network connection issue detected. This might be due to preview environment limitations.
              <br />
              <button onClick={() => setNetworkError(false)} className="underline hover:no-underline mt-1">
                Dismiss
              </button>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <PasswordInput
              id="password"
              placeholder={t("auth.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("common.loading") : t("auth.signIn")}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">{t("auth.noAccount")} </span>
          <button
            onClick={() => router.push("/auth/register")}
            className="text-blue-600 hover:underline font-medium"
            disabled={isLoading}
          >
            {t("auth.signUp")}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
