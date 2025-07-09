"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PasswordInput } from "@/components/ui/password-input"
import { LanguageSwitcher } from "@/components/language-switcher"
import { createClient } from "@/lib/supabase/client"
import { useLanguage } from "@/hooks/use-language"
import { validateName, validateEmail, validatePassword } from "@/lib/validation"

export function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    faculty: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [networkError, setNetworkError] = useState(false)
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const supabase = createClient()
  const { t } = useLanguage()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Validate name
    const nameValidation = validateName(formData.fullName)
    if (!nameValidation.isValid) {
      newErrors.fullName = nameValidation.error!
    }

    // Validate email
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "passwordMismatch"
    }

    // Validate role
    if (!formData.role) {
      newErrors.role = "roleRequired"
    }

    // Validate faculty (if role is selected)
    if (formData.role && !formData.faculty) {
      newErrors.faculty = "facultyRequired"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNetworkError(false)
    setSuccess("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      console.log("Attempting to register user with data:", {
        email: formData.email,
        fullName: formData.fullName,
        role: formData.role,
        faculty: formData.faculty,
      })

      const signUpPromise = supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: formData.role,
            faculty: formData.faculty,
          },
        },
      })

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Registration timeout")), 15000),
      )

      const result = await Promise.race([signUpPromise, timeoutPromise])
      const { data, error } = result as any

      console.log("Registration response:", { data, error })

      if (error) {
        console.error("Registration error:", error)
        if (error.message.includes("User already registered")) {
          setErrors({ email: "User already exists with this email" })
        } else {
          setErrors({ general: error.message })
        }
      } else {
        console.log("Registration successful:", data)

        // If user is created but needs email confirmation
        if (data.user && !data.user.email_confirmed_at) {
          setSuccess(t("registerSuccess"))
        } else {
          setSuccess("Account created successfully!")
        }

        setTimeout(() => router.push("/auth/login"), 2000)
      }
    } catch (error: any) {
      console.error("Unexpected registration error:", error)
      if (error.message === "Registration timeout" || error.message.includes("fetch")) {
        setNetworkError(true)
        setErrors({ general: "Network connection issue. Please check your connection and try again." })
      } else {
        setErrors({ general: "An unexpected error occurred. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1" />
          <CardTitle className="text-2xl">{t("createAccountTitle")}</CardTitle>
          <div className="flex-1 flex justify-end">
            <LanguageSwitcher />
          </div>
        </div>
        <CardDescription>{t("registerDescription")}</CardDescription>
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
            <Label htmlFor="fullName">{t("fullName")}</Label>
            <Input
              id="fullName"
              placeholder="João Silva"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value })
                clearFieldError("fullName")
              }}
              className={errors.fullName ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.fullName && <p className="text-sm text-red-500">{t(errors.fullName)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                clearFieldError("email")
              }}
              className={errors.email ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.email && <p className="text-sm text-red-500">{t(errors.email)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">{t("role")}</Label>
            <Select
              onValueChange={(value) => {
                setFormData({ ...formData, role: value })
                clearFieldError("role")
              }}
              disabled={isLoading}
            >
              <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                <SelectValue placeholder={t("selectRole")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">{t("student")}</SelectItem>
                <SelectItem value="lecturer">{t("lecturer")}</SelectItem>
                <SelectItem value="coordinator">{t("coordinator")}</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-sm text-red-500">{t(errors.role)}</p>}
          </div>

          {formData.role && (
            <div className="space-y-2">
              <Label htmlFor="faculty">{t("faculty")}</Label>
              <Select
                onValueChange={(value) => {
                  setFormData({ ...formData, faculty: value })
                  clearFieldError("faculty")
                }}
                disabled={isLoading}
              >
                <SelectTrigger className={errors.faculty ? "border-red-500" : ""}>
                  <SelectValue placeholder={t("selectFaculty")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">{t("computerScience")}</SelectItem>
                  <SelectItem value="business-management">{t("businessManagement")}</SelectItem>
                  <SelectItem value="accounting">{t("accounting")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.faculty && <p className="text-sm text-red-500">{t(errors.faculty)}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value })
                clearFieldError("password")
              }}
              showPasswordLabel={t("showPassword")}
              hidePasswordLabel={t("hidePassword")}
              className={errors.password ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.password && <p className="text-sm text-red-500">{t(errors.password)}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value })
                clearFieldError("confirmPassword")
              }}
              showPasswordLabel={t("showPassword")}
              hidePasswordLabel={t("hidePassword")}
              className={errors.confirmPassword ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{t(errors.confirmPassword)}</p>}
          </div>

          {errors.general && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{errors.general}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading ? t("creatingAccount") : t("createAccount")}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t("alreadyHaveAccount")}{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              {t("signIn")}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
