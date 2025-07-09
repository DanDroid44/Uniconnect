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
import { validateEmail, validatePassword, validateName } from "@/lib/validation"
import { useLanguage } from "@/hooks/use-language"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [networkError, setNetworkError] = useState(false)
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const { t } = useLanguage()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setNetworkError(false)
    setIsLoading(true)

    // Validate inputs
    const firstNameValidation = validateName(formData.firstName)
    const lastNameValidation = validateName(formData.lastName)
    const emailValidation = validateEmail(formData.email)
    const passwordValidation = validatePassword(formData.password)

    if (!firstNameValidation.isValid) {
      setError(firstNameValidation.error || "Invalid first name")
      setIsLoading(false)
      return
    }

    if (!lastNameValidation.isValid) {
      setError(lastNameValidation.error || "Invalid last name")
      setIsLoading(false)
      return
    }

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

    if (formData.password !== formData.confirmPassword) {
      setError(t("auth.passwordMismatch"))
      setIsLoading(false)
      return
    }

    try {
      const supabase = createClient()

      // Add timeout for registration attempt
      const signUpPromise = supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`,
          },
        },
      })

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Registration timeout")), 15000),
      )

      const { data, error: authError } = (await Promise.race([signUpPromise, timeoutPromise])) as any

      if (authError) {
        if (authError.message.includes("User already registered")) {
          setError(t("auth.userExists"))
        } else {
          setError(authError.message)
        }
        return
      }

      if (data.user) {
        if (data.user.email_confirmed_at) {
          setSuccess(t("auth.registrationSuccess"))
          setTimeout(() => router.push("/dashboard"), 2000)
        } else {
          setSuccess(t("auth.checkEmail"))
          setTimeout(() => router.push("/auth/login"), 3000)
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error)
      if (error.message === "Registration timeout" || error.message.includes("fetch")) {
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
        <CardTitle className="text-2xl font-bold text-center">{t("auth.signUp")}</CardTitle>
        <CardDescription className="text-center">{t("auth.signUpDescription")}</CardDescription>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("auth.firstName")}</Label>
              <Input
                id="firstName"
                placeholder={t("auth.firstNamePlaceholder")}
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t("auth.lastName")}</Label>
              <Input
                id="lastName"
                placeholder={t("auth.lastNamePlaceholder")}
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.password")}</Label>
            <PasswordInput
              id="password"
              placeholder={t("auth.passwordPlaceholder")}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("auth.confirmPassword")}</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder={t("auth.confirmPasswordPlaceholder")}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? t("common.loading") : t("auth.signUp")}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">{t("auth.hasAccount")} </span>
          <button
            onClick={() => router.push("/auth/login")}
            className="text-blue-600 hover:underline font-medium"
            disabled={isLoading}
          >
            {t("auth.signIn")}
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
