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
import { PasswordInput } from "@/components/ui/password-input"
import { LanguageSwitcher } from "@/components/language-switcher"
import { createClient } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"
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

      const { data, error } = await supabase.auth.signUp({
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

      console.log("Registration response:", { data, error })

      if (error) {
        console.error("Registration error:", error)
        toast({
          title: t("error"),
          description: error.message,
          variant: "destructive",
        })
      } else {
        console.log("Registration successful:", data)

        // If user is created but needs email confirmation
        if (data.user && !data.user.email_confirmed_at) {
          toast({
            title: t("success"),
            description: t("registerSuccess"),
          })
        } else {
          toast({
            title: t("success"),
            description: "Account created successfully!",
          })
        }

        router.push("/auth/login")
      }
    } catch (error) {
      console.error("Unexpected registration error:", error)
      toast({
        title: t("error"),
        description: t("unexpectedError"),
        variant: "destructive",
      })
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
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{t(errors.confirmPassword)}</p>}
          </div>

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
