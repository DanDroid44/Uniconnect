"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PasswordInput } from "@/components/ui/password-input"
import { LanguageSwitcher } from "@/components/language-switcher"
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

      const result = await Promise.race([loginPromise, timeoutPromise])
      const { data, error: authError } = result as any

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          setError("Invalid email or password")
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
      <CardHeader className="text-center">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1" />
          <CardTitle className="text-2xl">{t("signInTitle")}</CardTitle>
          <div className="flex-1 flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>
        <CardDescription>{t("signInDescription")}</CardDescription>
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
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("password")}</Label>
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                {t("forgotPassword")}
              </Link>
            </div>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordLabel={t("showPassword")}
              hidePasswordLabel={t("hidePassword")}
              required
              disabled={isLoading}
            />
          </div>
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? t("signingIn") : t("signIn")}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("dontHaveAccount")}{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              {t("createAccount")}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
